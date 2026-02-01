import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, ArrowLeft } from 'lucide-react';

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Link href="/app">
          <Button variant="ghost" className="mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar ao Dashboard
          </Button>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Escolha seu pacote de créditos</h1>
          <p className="text-xl text-gray-600">
            Cada crédito gera 1 currículo otimizado com IA
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* 1 CV */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">1 Currículo</CardTitle>
              <CardDescription>Para testar</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 4,90</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>1 crédito</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Currículo otimizado com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDF profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Sem expiração</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Em breve
              </Button>
              <p className="text-xs text-center text-gray-500">
                Integração com pagamento em desenvolvimento
              </p>
            </CardContent>
          </Card>

          {/* 10 CVs - Popular */}
          <Card className="border-2 border-blue-500 relative shadow-xl shadow-blue-500/20 scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              MAIS POPULAR
            </div>
            <CardHeader>
              <CardTitle className="text-2xl">10 Currículos</CardTitle>
              <CardDescription>Melhor custo-benefício</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 19,90</div>
                <div className="text-sm text-gray-500">
                  R$ 1,99 por currículo
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>10 créditos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Currículos otimizados com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDFs profissionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Sem expiração</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Economize 59%</span>
                </li>
              </ul>
              <Button className="w-full" disabled>
                Em breve
              </Button>
              <p className="text-xs text-center text-gray-500">
                Integração com pagamento em desenvolvimento
              </p>
            </CardContent>
          </Card>

          {/* 50 CVs */}
          <Card className="border-2 hover:shadow-lg transition-all">
            <CardHeader>
              <CardTitle className="text-2xl">50 Currículos</CardTitle>
              <CardDescription>Para processos seletivos</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 49,90</div>
                <div className="text-sm text-gray-500">
                  Menos de R$ 1,00 por currículo
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>50 créditos</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Currículos otimizados com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDFs profissionais</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Sem expiração</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Economize 80%</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" disabled>
                Em breve
              </Button>
              <p className="text-xs text-center text-gray-500">
                Integração com pagamento em desenvolvimento
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="bg-white border-2">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-lg mb-4 text-center">Perguntas Frequentes</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium mb-1">Os créditos expiram?</p>
                  <p className="text-gray-600">Não! Seus créditos não expiram. Use quando quiser.</p>
                </div>
                <div>
                  <p className="font-medium mb-1">Como funciona o pagamento?</p>
                  <p className="text-gray-600">
                    Estamos integrando com Stripe para pagamentos seguros. Em breve você poderá comprar créditos diretamente na plataforma.
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1">Posso gerar vários CVs com os mesmos créditos?</p>
                  <p className="text-gray-600">
                    Cada geração de currículo consome 1 crédito. Se você comprar 10 créditos, pode gerar 10 currículos diferentes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
