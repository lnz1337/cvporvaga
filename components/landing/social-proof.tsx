import { Star } from "lucide-react";

export default function SocialProof() {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg mb-8">
          <div className="flex -space-x-2">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white font-bold text-xs"
              >
                {String.fromCharCode(64 + i)}
              </div>
            ))}
          </div>
          <div className="text-left">
            <div className="flex gap-0.5 mb-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm font-semibold">
              <span className="text-blue-600">787+</span> currículos otimizados
            </p>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">
          Junte-se a centenas de profissionais que já melhoraram seus currículos
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Nossa ferramenta já ajudou mais de 787 pessoas a criarem currículos otimizados 
          e aumentarem suas chances de conseguir entrevistas.
        </p>
      </div>
    </section>
  );
}
