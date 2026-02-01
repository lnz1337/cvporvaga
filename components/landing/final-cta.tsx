import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-purple-700 text-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
          Crie seu CV, Se destaque, Conquiste a Vaga
        </h2>
        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
          Pare de perder tempo com currículos que não passam pelos sistemas ATS.
          Deixe a IA trabalhar por você e aumente suas chances de conseguir entrevistas.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/signup">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 shadow-2xl shadow-black/20 group"
            >
              Criar meu CV Otimizado
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/ats">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10"
            >
              Testar gratuitamente
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
