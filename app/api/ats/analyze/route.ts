import { NextRequest, NextResponse } from 'next/server';
import { analyzeATS } from '@/lib/ats-scorer';
import { z } from 'zod';

const analyzeSchema = z.object({
  resumeText: z.string().min(10, 'Currículo muito curto'),
  jobDescription: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { resumeText, jobDescription } = analyzeSchema.parse(body);

    const result = analyzeATS(resumeText, jobDescription);

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    console.error('Erro na análise ATS:', error);
    return NextResponse.json(
      { error: 'Erro ao analisar currículo' },
      { status: 500 }
    );
  }
}
