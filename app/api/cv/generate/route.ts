import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/auth';
import { db } from '@/lib/db';
import { generateOptimizedCV } from '@/lib/openai';
import { generatePDF } from '@/lib/pdf-generator';
import { analyzeATS } from '@/lib/ats-scorer';
import { z } from 'zod';

const generateSchema = z.object({
  resumeText: z.string().min(50, 'Currículo muito curto'),
  jobDescription: z.string().min(50, 'Descrição da vaga muito curta'),
});

export async function POST(request: NextRequest) {
  try {
    // Verificar autenticação
    const user = await requireAuth();

    // Validar entrada
    const body = await request.json();
    const { resumeText, jobDescription } = generateSchema.parse(body);

    // Verificar se tem créditos
    if (user.credits < 1) {
      return NextResponse.json(
        { error: 'Você não tem créditos suficientes' },
        { status: 403 }
      );
    }

    // Calcular score antes
    const beforeAnalysis = analyzeATS(resumeText);

    // Salvar resume e job no banco
    const resume = await db.resume.create({
      data: {
        userId: user.id,
        rawText: resumeText,
      },
    });

    const job = await db.job.create({
      data: {
        userId: user.id,
        descriptionText: jobDescription,
      },
    });

    // Gerar CV otimizado com IA
    const cvData = await generateOptimizedCV(resumeText, jobDescription);

    // Calcular score depois (usando o currículo gerado)
    const afterText = `
${cvData.name}
${cvData.headline}
${cvData.summary}

${cvData.experience?.map(exp => `
${exp.role} - ${exp.company}
${exp.dates}
${exp.bullets?.join('\n')}
`).join('\n')}

${cvData.education?.map(edu => `${edu.degree} - ${edu.institution}`).join('\n')}

${cvData.skills?.join(', ')}
    `.trim();

    const afterAnalysis = analyzeATS(afterText, jobDescription);

    // Gerar PDF
    const pdfPath = await generatePDF(cvData);

    // Salvar geração no banco
    const generation = await db.generation.create({
      data: {
        userId: user.id,
        resumeId: resume.id,
        jobId: job.id,
        atsScoreBefore: beforeAnalysis.score,
        atsScoreAfter: afterAnalysis.score,
        outputJson: JSON.stringify(cvData),
        outputPdfPath: pdfPath,
      },
    });

    // Consumir 1 crédito
    await db.user.update({
      where: { id: user.id },
      data: {
        credits: {
          decrement: 1,
        },
      },
    });

    return NextResponse.json({
      success: true,
      cv: cvData,
      pdfUrl: pdfPath,
      generationId: generation.id,
      scoreBefore: beforeAnalysis.score,
      scoreAfter: afterAnalysis.score,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'Não autenticado') {
      return NextResponse.json(
        { error: 'Não autenticado' },
        { status: 401 }
      );
    }

    console.error('Erro ao gerar CV:', error);
    return NextResponse.json(
      { error: 'Erro ao gerar currículo. Tente novamente.' },
      { status: 500 }
    );
  }
}
