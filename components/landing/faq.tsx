import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
  const faqs = [
    {
      question: "O que exatamente eu recebo?",
      answer: "Você receberá um arquivo PDF com seu currículo completamente reescrito e otimizado para a vaga específica. O CV será formatado de maneira ATS-friendly (compatível com sistemas de rastreamento de candidatos), com seções claras, bullets points e keywords relevantes destacadas.",
    },
    {
      question: "Preciso criar uma conta?",
      answer: "Sim, você precisa criar uma conta gratuita para usar nossos serviços. Isso permite que você gerencie seus créditos, mantenha um histórico das suas gerações e acesse seus currículos otimizados a qualquer momento.",
    },
    {
      question: "Os créditos expiram?",
      answer: "Não! Seus créditos não expiram. Você pode usá-los quando quiser, sem pressa. Compre agora e use quando precisar.",
    },
    {
      question: "A análise ATS é realmente gratuita?",
      answer: "Sim! A análise ATS é 100% gratuita e ilimitada. Você pode testar quantos currículos quiser para ver o score e receber sugestões de melhorias. Você só paga quando quiser gerar um currículo otimizado completo com IA.",
    },
    {
      question: "Funciona para qualquer área?",
      answer: "Sim! Nossa IA foi treinada para trabalhar com currículos de todas as áreas: tecnologia, marketing, vendas, engenharia, saúde, educação, direito e muito mais. Ela adapta o conteúdo para a linguagem e requisitos específicos de cada setor.",
    },
    {
      question: "E se o arquivo PDF não abrir?",
      answer: "Temos uma Garantia de Qualidade: se por algum motivo o arquivo PDF gerado apresentar problemas ou não abrir corretamente, nós geramos outro currículo para você sem custo adicional. Seu crédito será restaurado automaticamente.",
    },
    {
      question: "Posso usar o mesmo crédito para várias vagas?",
      answer: "Não. Cada geração de currículo consome 1 crédito, pois nossa IA faz uma análise completa e personalizada para cada vaga específica. Se você quer se candidatar a 10 vagas diferentes, recomendamos o pacote de 10 currículos para economizar.",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-xl text-gray-600">
            Tire suas dúvidas sobre o CvPorVaga
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 border-0 shadow-sm"
            >
              <AccordionTrigger className="text-left hover:no-underline">
                <span className="font-semibold">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
