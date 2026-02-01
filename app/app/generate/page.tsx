'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Wand2, Download, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

type Step = 1 | 2 | 3;

export default function GenerateCVPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [resumeText, setResumeText] = useState('');
  const [jobText, setJobText] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedCV, setGeneratedCV] = useState<any>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!resumeText.trim() || !jobText.trim()) {
      alert('Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/cv/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jobDescription: jobText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Erro ao gerar currículo');
        return;
      }

      const data = await res.json();
      setGeneratedCV(data.cv);
      setPdfUrl(data.pdfUrl);
      setCurrentStep(3);
    } catch (error) {
      alert('Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Seu Currículo', icon: Upload },
    { number: 2, title: 'Descrição da Vaga', icon: Wand2 },
    { number: 3, title: 'CV Otimizado', icon: Download },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Gerar CV Otimizado</h1>
        <p className="text-gray-600">
          Siga os 3 passos para criar seu currículo otimizado com IA
        </p>
      </div>

      {/* Progress Steps */}
      <div className="mb-12">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <div
            className="absolute top-5 left-0 h-0.5 bg-blue-600 -z-10 transition-all duration-500"
            style={{ width: `${((currentStep - 1) / 2) * 100}%` }}
          />
          
          {steps.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;

            return (
              <div key={step.number} className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 transition-all ${
                    isCompleted
                      ? 'bg-green-500 text-white'
                      : isActive
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <Icon className="w-5 h-5" />
                  )}
                </div>
                <span className={`text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Step 1: Resume Input */}
      {currentStep === 1 && (
        <Card>
          <CardHeader>
            <CardTitle>Passo 1: Cole seu currículo atual</CardTitle>
            <CardDescription>
              Copie e cole todo o conteúdo do seu currículo (não precisa estar perfeito)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Cole aqui todo o texto do seu currículo atual..."
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
            <div className="flex justify-end">
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!resumeText.trim()}
                size="lg"
              >
                Próximo Passo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Job Description */}
      {currentStep === 2 && (
        <Card>
          <CardHeader>
            <CardTitle>Passo 2: Cole a descrição da vaga</CardTitle>
            <CardDescription>
              Copie a vaga completa para que a IA adapte seu CV especificamente para ela
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Cole aqui o texto completo da vaga (requisitos, responsabilidades, etc)..."
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              rows={16}
              className="font-mono text-sm"
            />
            <div className="flex justify-between">
              <Button
                onClick={() => setCurrentStep(1)}
                variant="outline"
                size="lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar
              </Button>
              <Button
                onClick={handleGenerate}
                disabled={!jobText.trim() || loading}
                size="lg"
              >
                {loading ? 'Gerando...' : 'Gerar CV Otimizado'}
                {!loading && <Wand2 className="w-4 h-4 ml-2" />}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Result */}
      {currentStep === 3 && generatedCV && (
        <div className="space-y-6">
          <Card className="border-2 border-green-500">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="flex items-center gap-2 text-green-700">
                <CheckCircle2 className="w-6 h-6" />
                CV Otimizado Criado com Sucesso!
              </CardTitle>
              <CardDescription>
                Seu currículo foi reescrito e otimizado para a vaga. Baixe o PDF abaixo.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              {pdfUrl && (
                <a href={pdfUrl} download>
                  <Button size="lg" className="w-full">
                    <Download className="w-5 h-5 mr-2" />
                    Baixar CV em PDF
                  </Button>
                </a>
              )}
              <Button
                variant="outline"
                size="lg"
                className="w-full"
                onClick={() => router.push('/app')}
              >
                Voltar ao Dashboard
              </Button>
            </CardContent>
          </Card>

          {/* Preview do CV */}
          <Card>
            <CardHeader>
              <CardTitle>Prévia do Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 max-h-96 overflow-y-auto">
              <div>
                <h3 className="font-bold text-2xl mb-1">{generatedCV.name}</h3>
                <p className="text-gray-600 mb-4">{generatedCV.headline}</p>
                <p className="text-sm leading-relaxed">{generatedCV.summary}</p>
              </div>

              {generatedCV.experience?.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg mb-2">Experiência</h4>
                  {generatedCV.experience.map((exp: any, i: number) => (
                    <div key={i} className="mb-3">
                      <div className="font-semibold">{exp.role}</div>
                      <div className="text-sm text-gray-600">{exp.company} · {exp.dates}</div>
                      <ul className="mt-1 space-y-1 text-sm">
                        {exp.bullets?.map((bullet: string, j: number) => (
                          <li key={j} className="flex gap-2">
                            <span>•</span>
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {generatedCV.skills?.length > 0 && (
                <div>
                  <h4 className="font-bold text-lg mb-2">Habilidades</h4>
                  <div className="flex flex-wrap gap-2">
                    {generatedCV.skills.map((skill: string, i: number) => (
                      <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md text-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
