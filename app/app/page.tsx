import Link from 'next/link';
import { getSession } from '@/lib/auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScanSearch, Wand2, ArrowRight } from 'lucide-react';

export default async function DashboardPage() {
  const session = await getSession();

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Olá{session?.name ? `, ${session.name}` : ''}! 👋
        </h1>
        <p className="text-gray-600">
          O que você gostaria de fazer hoje?
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Scanner ATS Grátis */}
        <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all">
          <CardHeader>
            <div className="w-14 h-14 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <ScanSearch className="w-7 h-7 text-green-600" />
            </div>
            <CardTitle className="text-2xl">Analisar meu currículo</CardTitle>
            <CardDescription className="text-base">
              Teste gratuitamente e veja como seu CV se sai nos sistemas ATS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <span>Score de 0 a 100</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <span>Sugestões de melhorias</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <span>Análise de keywords</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5" />
                <span className="font-semibold text-green-700">100% Grátis</span>
              </li>
            </ul>
            <Link href="/app/ats">
              <Button className="w-full bg-green-600 hover:bg-green-700 group">
                Analisar gratuitamente
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Gerar CV Otimizado */}
        <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all">
          <CardHeader>
            <div className="w-14 h-14 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Wand2 className="w-7 h-7 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Gerar CV otimizado</CardTitle>
            <CardDescription className="text-base">
              Use IA para criar um currículo adaptado para a vaga
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 mb-6 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <span>Reescrita com IA</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <span>Keywords otimizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <span>PDF profissional</span>
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5" />
                <span className="font-semibold text-blue-700">Consome 1 crédito</span>
              </li>
            </ul>
            <Link href="/app/generate">
              <Button className="w-full group" disabled={!session?.credits || session.credits < 1}>
                {!session?.credits || session.credits < 1 ? 'Sem créditos' : 'Gerar CV'}
                {session?.credits && session.credits > 0 && (
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                )}
              </Button>
            </Link>
            {(!session?.credits || session.credits < 1) && (
              <Link href="/pricing">
                <Button variant="outline" className="w-full mt-2">
                  Comprar créditos
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Stats rápidas */}
      <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-blue-600">{session?.credits || 0}</div>
          <div className="text-sm text-gray-600">Créditos disponíveis</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-green-600">∞</div>
          <div className="text-sm text-gray-600">Análises ATS grátis</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-purple-600">98%</div>
          <div className="text-sm text-gray-600">Score médio ATS</div>
        </div>
        <div className="bg-white rounded-lg p-4 border">
          <div className="text-2xl font-bold text-orange-600">3x</div>
          <div className="text-sm text-gray-600">Mais entrevistas</div>
        </div>
      </div>
    </div>
  );
}
