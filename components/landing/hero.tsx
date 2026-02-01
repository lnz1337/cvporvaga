import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, CheckCircle2 } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-4 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              <span>Otimização com IA</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Chega de enviar CVs e{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                nunca receber resposta
              </span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Nossa IA adapta seu currículo para cada vaga específica, destacando as habilidades
              certas e usando as palavras-chave que os sistemas ATS procuram. Aumente suas chances
              de conseguir entrevistas.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/signup">
                <Button size="lg" className="shadow-xl shadow-blue-500/30 hover:shadow-2xl hover:shadow-blue-500/40 transition-all">
                  Gerar CV Otimizado
                </Button>
              </Link>
              <Link href="/ats">
                <Button size="lg" variant="outline">
                  Testar meu CV atual
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-8 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>ATS-friendly</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>Otimizado com IA</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <span>PDF profissional</span>
              </div>
            </div>
          </div>

          {/* Right column - Mock CV Preview */}
          <div className="relative animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-gray-100">
              {/* ATS Score Badge */}
              <div className="absolute -top-4 -right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-float">
                <div className="text-center">
                  <div className="text-3xl font-bold">98%</div>
                  <div className="text-xs uppercase tracking-wide">ATS Score</div>
                </div>
              </div>

              {/* Mock CV Content */}
              <div className="space-y-6">
                <div>
                  <div className="h-8 bg-gray-900 rounded w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-blue-100 rounded"></div>
                  <div className="h-3 bg-blue-100 rounded w-5/6"></div>
                  <div className="h-3 bg-blue-100 rounded w-4/6"></div>
                </div>

                <div>
                  <div className="h-5 bg-gray-800 rounded w-1/3 mb-3"></div>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <div className="h-3 bg-gray-200 rounded flex-1"></div>
                    </div>
                    <div className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5"></div>
                      <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="h-5 bg-gray-800 rounded w-1/4 mb-3"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="h-6 bg-blue-50 border border-blue-200 rounded px-3 w-20"></div>
                    <div className="h-6 bg-blue-50 border border-blue-200 rounded px-3 w-24"></div>
                    <div className="h-6 bg-blue-50 border border-blue-200 rounded px-3 w-16"></div>
                    <div className="h-6 bg-blue-50 border border-blue-200 rounded px-3 w-28"></div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -left-6 top-1/4 bg-white px-4 py-2 rounded-lg shadow-lg border border-blue-200 text-sm font-medium text-blue-700 animate-float" style={{ animationDelay: '0.5s' }}>
                Keywords otimizadas ✓
              </div>
              <div className="absolute -right-6 bottom-1/4 bg-white px-4 py-2 rounded-lg shadow-lg border border-green-200 text-sm font-medium text-green-700 animate-float" style={{ animationDelay: '1s' }}>
                Formato ATS ✓
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
