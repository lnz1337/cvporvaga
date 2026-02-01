import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, Sparkles, Zap, TrendingUp } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-20 px-4" id="precos">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Escolha o plano ideal para você
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comece gratuitamente com a análise ATS ou invista em currículos otimizados com IA.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          {/* Free ATS */}
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">Avaliação ATS</CardTitle>
              <CardDescription>Teste seu currículo gratuitamente</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">Grátis</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Score ATS de 0 a 100</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Lista de melhorias sugeridas</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Análise de keywords</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Ilimitado</span>
                </li>
              </ul>
              <Link href="/ats" className="block">
                <Button variant="outline" className="w-full">
                  Avaliar meu CV grátis
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 1 CV */}
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-green-500" />
              </div>
              <CardTitle className="text-2xl">1 Currículo</CardTitle>
              <CardDescription>Para testar a ferramenta</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 4,90</div>
                <div className="text-sm text-gray-500">pagamento único</div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>1 currículo otimizado</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Reescrita com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDF profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>ATS-friendly</span>
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button variant="outline" className="w-full">
                  Começar agora
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 10 CVs - Popular */}
          <Card className="border-2 border-blue-500 relative shadow-xl shadow-blue-500/20 scale-105">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1.5 rounded-full">
              MAIS POPULAR
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-blue-500" />
              </div>
              <CardTitle className="text-2xl">10 Currículos</CardTitle>
              <CardDescription>O favorito dos candidatos</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 19,90</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">R$ 49,00</span> · economize 59%
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>10 currículos otimizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Reescrita com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDF profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>ATS-friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">R$ 1,99 por CV</span>
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button className="w-full shadow-lg shadow-blue-500/30">
                  Começar agora
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 50 CVs */}
          <Card className="border-2">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-purple-50 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-500" />
              </div>
              <CardTitle className="text-2xl">50 Currículos</CardTitle>
              <CardDescription>Para processos seletivos</CardDescription>
              <div className="pt-4">
                <div className="text-4xl font-bold">R$ 49,90</div>
                <div className="text-sm text-gray-500">
                  <span className="line-through">R$ 245,00</span> · economize 80%
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>50 currículos otimizados</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>Reescrita com IA</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>PDF profissional</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span>ATS-friendly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                  <span className="font-semibold">Menos de R$ 1,00 por CV</span>
                </li>
              </ul>
              <Link href="/pricing" className="block">
                <Button variant="outline" className="w-full">
                  Começar agora
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600 bg-green-50 border border-green-200 rounded-lg px-4 py-3 inline-flex items-center gap-2">
            <Check className="w-5 h-5 text-green-600" />
            <span>
              <strong>Garantia de Qualidade:</strong> Se o arquivo não abrir, geramos outro sem custo adicional.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
