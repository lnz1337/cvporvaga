export interface ATSAnalysisResult {
  score: number;
  issues: string[];
  suggestions: string[];
  missingKeywords?: string[];
}

export function analyzeATS(resumeText: string, jobDescription?: string): ATSAnalysisResult {
  let score = 100;
  const issues: string[] = [];
  const suggestions: string[] = [];
  const missingKeywords: string[] = [];

  // Normalizar texto
  const text = resumeText.toLowerCase();
  const lines = resumeText.split('\n').filter(l => l.trim());

  // 1. Verificar seções essenciais
  const hasExperience = /experiência|experience|trabalho|emprego/i.test(resumeText);
  const hasEducation = /educação|education|formação|graduação/i.test(resumeText);
  const hasSkills = /habilidades|skills|competências|conhecimentos/i.test(resumeText);
  const hasSummary = /resumo|summary|sobre|perfil|objetivo/i.test(resumeText);

  if (!hasExperience) {
    score -= 20;
    issues.push('Seção de Experiência não encontrada');
    suggestions.push('Adicione uma seção clara de Experiência Profissional');
  }

  if (!hasEducation) {
    score -= 15;
    issues.push('Seção de Educação não encontrada');
    suggestions.push('Inclua sua formação acadêmica');
  }

  if (!hasSkills) {
    score -= 15;
    issues.push('Seção de Habilidades não encontrada');
    suggestions.push('Liste suas principais habilidades técnicas');
  }

  if (!hasSummary) {
    score -= 10;
    issues.push('Resumo profissional não encontrado');
    suggestions.push('Adicione um resumo profissional no início');
  }

  // 2. Verificar tamanho mínimo
  if (resumeText.length < 200) {
    score -= 15;
    issues.push('Currículo muito curto');
    suggestions.push('Expanda as descrições das suas experiências');
  }

  // 3. Verificar uso de bullets/listas
  const hasBullets = /[-•*]/.test(resumeText);
  if (!hasBullets && resumeText.length > 300) {
    score -= 10;
    issues.push('Falta de formatação com bullets');
    suggestions.push('Use bullet points para listar responsabilidades e conquistas');
  }

  // 4. Verificar datas
  const hasYear = /20\d{2}|19\d{2}/.test(resumeText);
  if (!hasYear) {
    score -= 10;
    issues.push('Datas não encontradas');
    suggestions.push('Inclua períodos (mês/ano) em suas experiências');
  }

  // 5. Verificar se há cargos/empresas
  const linesWithDash = lines.filter(l => l.includes('-')).length;
  if (hasExperience && linesWithDash < 2) {
    score -= 10;
    issues.push('Faltam detalhes de cargos e empresas');
    suggestions.push('Especifique cargo e empresa para cada experiência');
  }

  // 6. Análise de keywords se vaga fornecida
  if (jobDescription && jobDescription.trim().length > 50) {
    const jobKeywords = extractKeywords(jobDescription);
    const resumeKeywords = extractKeywords(resumeText);
    
    const missing = jobKeywords.filter(kw => !resumeKeywords.includes(kw));
    
    if (missing.length > 0) {
      const coverage = ((jobKeywords.length - missing.length) / jobKeywords.length) * 100;
      
      if (coverage < 40) {
        score -= 20;
        issues.push('Baixa correspondência com palavras-chave da vaga');
      } else if (coverage < 60) {
        score -= 10;
        issues.push('Correspondência moderada com palavras-chave da vaga');
      }

      missingKeywords.push(...missing.slice(0, 8)); // Top 8 missing
      
      if (missing.length > 0) {
        suggestions.push(`Inclua keywords relevantes: ${missing.slice(0, 5).join(', ')}`);
      }
    }
  }

  // Garantir que score não seja negativo
  score = Math.max(0, Math.min(100, score));

  return {
    score: Math.round(score),
    issues,
    suggestions,
    missingKeywords: missingKeywords.length > 0 ? missingKeywords : undefined,
  };
}

function extractKeywords(text: string): string[] {
  // Remover pontuação e normalizar
  const normalized = text
    .toLowerCase()
    .replace(/[^\w\sáéíóúâêôãõç]/g, ' ')
    .replace(/\s+/g, ' ');

  const words = normalized.split(' ');
  
  // Stopwords em português
  const stopwords = new Set([
    'o', 'a', 'os', 'as', 'um', 'uma', 'de', 'do', 'da', 'dos', 'das',
    'em', 'no', 'na', 'nos', 'nas', 'para', 'por', 'com', 'sem', 'sob',
    'e', 'ou', 'mas', 'que', 'se', 'como', 'ser', 'estar', 'ter', 'haver',
    'é', 'são', 'foi', 'será', 'tem', 'tinha', 'the', 'and', 'or', 'of',
    'to', 'in', 'for', 'on', 'at', 'with', 'by', 'from', 'as', 'is', 'was',
  ]);

  // Filtrar palavras relevantes (substantivos técnicos, habilidades)
  const keywords = words
    .filter(w => w.length > 3)
    .filter(w => !stopwords.has(w))
    .filter(w => !/^\d+$/.test(w));

  // Contar frequência
  const freq = new Map<string, number>();
  keywords.forEach(w => freq.set(w, (freq.get(w) || 0) + 1));

  // Pegar as mais frequentes
  return Array.from(freq.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word]) => word);
}
