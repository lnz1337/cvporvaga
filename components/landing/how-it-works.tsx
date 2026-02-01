import { Upload, Wand2, Download } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "1",
      icon: Upload,
      title: "Cole ou faça upload do seu CV",
      description: "Envie seu currículo atual em texto ou PDF. Nossa IA vai analisar todo o conteúdo.",
    },
    {
      number: "2",
      icon: Wand2,
      title: "Cole a descrição da vaga",
      description: "Adicione o texto da vaga desejada. A IA vai identificar as keywords essenciais.",
    },
    {
      number: "3",
      icon: Download,
      title: "Baixe seu CV otimizado",
      description: "Receba um PDF profissional, reformulado e otimizado para passar pelos sistemas ATS.",
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Currículo Otimizado em{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              3 Passos
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Simples, rápido e eficiente. Em menos de 2 minutos você terá um currículo pronto para se destacar.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection lines - hidden on mobile */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-blue-300 to-blue-200 -z-10" 
               style={{ width: 'calc(100% - 200px)', left: '100px' }} 
          />

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className="relative text-center"
                style={{
                  animationDelay: `${index * 0.15}s`,
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/30 mb-6 relative z-10">
                    <Icon className="w-9 h-9 text-white" />
                  </div>
                  
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-blue-500 flex items-center justify-center font-bold text-blue-600 shadow-sm">
                    {step.number}
                  </div>

                  <h3 className="text-xl font-semibold mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed max-w-sm">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
