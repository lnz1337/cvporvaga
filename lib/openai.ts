import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export interface CVData {
  name: string;
  headline: string;
  summary: string;
  experience: Array<{
    role: string;
    company: string;
    dates: string;
    bullets: string[];
  }>;
  education: Array<{
    degree: string;
    institution: string;
    dates: string;
  }>;
  skills: string[];
  projects?: Array<{
    name: string;
    description: string;
  }>;
}

export async function generateOptimizedCV(
  resumeText: string,
  jobDescription: string
): Promise<CVData> {
  const prompt = `Você é um especialista em recrutamento e otimização de currículos para sistemas ATS (Applicant Tracking System).

TAREFA: Reescreva o currículo abaixo para otimizá-lo para a vaga descrita, seguindo as melhores práticas de ATS.

CURRÍCULO ORIGINAL:
${resumeText}

DESCRIÇÃO DA VAGA:
${jobDescription}

INSTRUÇÕES:
1. Mantenha TODAS as informações reais do candidato - não invente experiências
2. Reformule descrições usando verbos de ação e resultados quantificáveis quando possível
3. Priorize keywords relevantes da descrição da vaga
4. Use formato ATS-friendly: seções claras, bullets, sem tabelas ou gráficos
5. Seja objetivo e direto - ideal para 1-2 páginas
6. Se alguma informação estiver faltando, use descrições genéricas mas verdadeiras

RETORNE APENAS um JSON válido no seguinte formato (sem markdown, sem \`\`\`json):
{
  "name": "Nome Completo",
  "headline": "Título Profissional",
  "summary": "Resumo profissional de 2-3 linhas destacando principais qualificações",
  "experience": [
    {
      "role": "Cargo",
      "company": "Nome da Empresa",
      "dates": "Mês/Ano - Mês/Ano ou Atual",
      "bullets": [
        "Conquista ou responsabilidade com verbo de ação",
        "Outra conquista quantificável quando possível"
      ]
    }
  ],
  "education": [
    {
      "degree": "Curso ou Grau",
      "institution": "Nome da Instituição",
      "dates": "Ano de início - Ano de conclusão"
    }
  ],
  "skills": ["Habilidade 1", "Habilidade 2", "..."],
  "projects": [
    {
      "name": "Nome do Projeto",
      "description": "Breve descrição"
    }
  ]
}`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um especialista em otimização de currículos para ATS. Retorne sempre JSON válido sem markdown.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = completion.choices[0]?.message?.content || '{}';
    
    // Remover possíveis markdown code blocks
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    
    const parsed = JSON.parse(cleaned);
    
    return parsed as CVData;
  } catch (error) {
    console.error('Erro ao gerar CV otimizado:', error);
    throw new Error('Falha ao gerar currículo otimizado. Tente novamente.');
  }
}
