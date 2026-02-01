'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { AlertCircle, CheckCircle2, XCircle, Sparkles } from 'lucide-react';

interface ATSResult {
  score: number;
  issues: string[];
  suggestions: string[];
  missingKeywords?: string[];
}

export default function ATSScannerPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [result, setResult] = useState<ATSResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!resumeText.trim()) {
      alert('Por favor, insira o texto do seu currículo');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('/api/ats/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobText || undefined,
        }),
      });

      if (!res.ok) throw new Error('Erro na análise');

      const data = await res.json();
      setResult(data);
    } catch (error) {
      alert('Erro ao analisar currículo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'from-green-500 to-green-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Scanner ATS Gratuito</h1>
        <p className="text-gray-600">
          Analise seu currículo e descubra como ele se sai nos sistemas de rastreamento de candidatos
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Formulário */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Seu Currículo</CardTitle>
              <CardDescription>
                Cole ou digite o texto do seu currículo atual
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Cole aqui todo o conteúdo do seu currículo..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Descrição da Vaga (Opcional)</CardTitle>
              <CardDescription>
                Cole a vaga para análise de keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Cole aqui o texto da vaga que você deseja se candidatar..."
                value={jobText}
                onChange={(e) => setJobText(e.target.value)}
                rows={8}
                className="font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Button
            onClick={handleAnalyze}
            disabled={loading || !resumeText.trim()}
            className="w-full"
            size="lg"
          >
            {loading ? 'Analisando...' : 'Analisar Currículo Grátis'}
          </Button>
        </div>

        {/* Resultado */}
        <div>
          {!result && !loading && (
            <Card className="border-2 border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Sparkles className="w-16 h-16 text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Cole seu currículo e clique em "Analisar" para ver os resultados
                </p>
              </CardContent>
            </Card>
          )}

          {loading && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Analisando seu currículo...</p>
              </CardContent>
            </Card>
          )}

          {result && (
            <div className="space-y-6">
              {/* Score Card */}
              <Card className="border-2">
                <CardContent className="pt-6">
                  <div className="text-center mb-6">
                    <div className={`text-6xl font-bold mb-2 ${getScoreColor(result.score)}`}>
                      {result.score}
                    </div>
                    <div className="text-gray-600 font-medium">ATS Score</div>
                    <Progress value={result.score} className="mt-4 h-3" />
                  </div>

                  <div className={`p-4 rounded-lg bg-gradient-to-r ${getScoreBgColor(result.score)} text-white text-center`}>
                    {result.score >= 80 && '🎉 Excelente! Seu currículo está muito bem otimizado.'}
                    {result.score >= 60 && result.score < 80 && '👍 Bom! Algumas melhorias podem aumentar suas chances.'}
                    {result.score < 60 && '⚠️ Atenção! Seu currículo precisa de otimizações.'}
                  </div>
                </CardContent>
              </Card>

              {/* Issues */}
              {result.issues.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      Problemas Encontrados
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.issues.map((issue, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 shrink-0" />
                          <span>{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {result.suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      Sugestões de Melhoria
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.suggestions.map((suggestion, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                          <span>{suggestion}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Missing Keywords */}
              {result.missingKeywords && result.missingKeywords.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Keywords Ausentes da Vaga</CardTitle>
                    <CardDescription>
                      Considere incluir estas palavras-chave no seu currículo
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {result.missingKeywords.map((kw, i) => (
                        <span
                          key={i}
                          className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium border border-blue-200"
                        >
                          {kw}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
