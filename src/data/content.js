import postsData from './posts.json';

export const siteContent = {
  hero: {
    title: "Excelência em Gestão e BPO Financeiro",
    subtitle: "A Athos Soluções Financeiras é o hub definitivo para transformar os resultados da sua empresa com inteligência, estratégia e inovação.",
    cta: "Fale com um Especialista",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
  },
  partners: [
    { id: 1, name: "Parceiro 1", url: "https://images.unsplash.com/photo-1614680376593-902f74a936c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 2, name: "Parceiro 2", url: "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 3, name: "Parceiro 3", url: "https://images.unsplash.com/photo-1614680376739-414fae547902?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 4, name: "Parceiro 4", url: "https://images.unsplash.com/photo-1614680376573-3e497390ea41?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" },
    { id: 5, name: "Parceiro 5", url: "https://images.unsplash.com/photo-1614680376593-902f74a936c2?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80" }
  ],
  about: {
    title: "Quem Somos",
    description: "Liderada por Odilon Albuquerque, CEO com mais de 3 anos de sólida atuação no mercado financeiro, a Athos tem presença marcante em diversos estados do Brasil, incluindo Alagoas, Pernambuco, Sergipe, Goiás, Paraíba e Rio de Janeiro.",
    mission: "Nossa missão é descomplicar as finanças corporativas e impulsionar o crescimento escalável dos nossos parceiros.",
    image: "/mapa-brasil.png"
  },
  services: {
    title: "Nossas Soluções",
    items: [
      {
        id: "bpo",
        title: "BPO Financeiro",
        description: "Terceirização completa e estratégica das rotinas financeiras da sua empresa.",
        pain: "Perda de tempo com rotinas burocráticas, contas atrasadas e fluxo de caixa confuso.",
        solution: "Nossa equipe assume o controle. Você foca no seu negócio enquanto nós organizamos tudo.",
        steps: ["Alinhamento de contas", "Conciliação diária", "Relatórios mensais de resultados"],
        image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "📊"
      },
      {
        id: "consultoria",
        title: "Consultoria Financeira",
        description: "Análise profunda para reestruturar finanças e maximizar lucros.",
        pain: "A empresa vende bem, mas o dinheiro não sobra e os custos parecem invisíveis.",
        solution: "Mapeamos os gargalos e criamos um plano tático focado na margem de lucro real.",
        steps: ["Raio-X Financeiro", "Identificação de Gargalos", "Plano de Redução de Custos"],
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "💡"
      },
      {
        id: "mentoria",
        title: "Mentoria Financeira",
        description: "Acompanhamento para empresários desenvolverem visão estratégica.",
        pain: "Insegurança na hora de tomar decisões de investimento e falta de visão de longo prazo.",
        solution: "Direcionamento lado a lado com o CEO para transformar você em um gestor de excelência.",
        steps: ["Mapeamento de Perfil", "Aulas Estratégicas", "Acompanhamento de Metas"],
        image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "🎯"
      },
      {
        id: "treinamento",
        title: "Treinamento de Equipes",
        description: "Capacitação de equipes com as melhores práticas do mercado.",
        pain: "Erros operacionais constantes e equipe sem padronização nas finanças.",
        solution: "Aplicamos nossa metodologia comprovada para nivelar sua equipe aos padrões de excelência.",
        steps: ["Avaliação da Equipe", "Treinamento Prático", "Implementação de Processos"],
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        icon: "🚀"
      }
    ]
  },
  testimonials: {
    title: "O que dizem nossos clientes",
    items: [
      {
        id: 1,
        name: "Empresa Parceira",
        text: "A Athos transformou nossa visão financeira. O BPO nos deu a tranquilidade que precisávamos para crescer.",
        type: "text",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
      }
    ]
  },
  contact: {
    title: "Entre em Contato",
    email: "contato@athosfinanceiro.com.br",
    whatsapp: "5582994010039",
    whatsappDisplay: "(82) 99401-0039",
    address: "Atendimento em AL, PE, SE, GO, PB, RJ e todo o Brasil."
  },
  blog: {
    title: "O Portal da Inteligência Financeira",
    subtitle: "Insights diários, análises profundas do mercado e estratégias para manter sua empresa um passo à frente da concorrência.",
    posts: postsData
  },
  promo: {
    show: true,
    title: "Mestre do BPO Financeiro: Novas Vagas Abertas",
    subtitle: "Aprenda a profissão que está dominando o mercado e transforme sua carreira com nossa metodologia exclusiva.",
    cta: "Quero me Inscrever",
    link: "https://wa.me/5582994010039?text=Quero saber mais sobre o curso de BPO.",
    badge: "Oportunidade Única"
  }
};
