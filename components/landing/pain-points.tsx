import { AlertCircle, FileX, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function PainPoints() {
  const problems = [
    {
      icon: FileX,
      title: "CVs ignorados por sistemas ATS",
      description: "Mais de 75% dos currículos são rejeitados automaticamente por sistemas de rastreamento antes mesmo de chegar nas mãos de um recrutador.",
    },
    {
      icon: Clock,
      title: "Horas ajustando currículos manualmente",
      description: "Você gasta tempo precioso tentando adequar seu CV para cada vaga, sem saber se está usando as palavras-chave certas.",
    },
    {
      icon: AlertCircle,
      title: "Sem feedback, sem entrevistas",
      description: "Você envia dezenas de currículos e não recebe nem uma resposta. É frustrante não saber o que está dando errado.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Você já passou por isso?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Sabemos como é frustrante enviar currículos e não receber retorno.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            return (
              <Card 
                key={index} 
                className="border-2 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                style={{
                  animationDelay: `${index * 0.1}s`,
                }}
              >
                <CardContent className="pt-6">
                  <div className="w-14 h-14 rounded-xl bg-red-50 flex items-center justify-center mb-4">
                    <Icon className="w-7 h-7 text-red-500" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {problem.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {problem.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
