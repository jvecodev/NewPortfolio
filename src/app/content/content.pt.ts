import { SiteContent } from './content.model';

export const CONTENT_PT: SiteContent = {
  meta: {
    title: 'João Vitor Oliveira — ML/AI Engineer',
    description:
      'ML/AI Engineer em Curitiba. LLMs, RAG, agentes de IA e Machine Learning integrados a sistemas com Python, FastAPI e Angular.',
  },
  a11y: {
    skip: 'Pular para o conteúdo',
    menu: 'Abrir menu',
    close: 'Fechar menu',
    language: 'Idioma',
    themeToLight: 'Ativar tema claro',
    themeToDark: 'Ativar tema escuro',
    globe: 'Globo com minha localização em Curitiba. Arraste para girar.',
  },
  nav: [
    { id: 'about', label: 'Sobre' },
    { id: 'projects', label: 'Projetos' },
    { id: 'expertise', label: 'IA & ML' },
    { id: 'certifications', label: 'Certificações' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contato' },
  ],
  hero: {
    greeting: 'Olá!',
    intro: 'Eu sou o',
    workplace: '@ Wise Systems',
    role: 'ML/AI Engineer — LLMs · RAG · Agentes de IA · Machine Learning',
    tagline:
      'Desenvolvo soluções com LLMs, pipelines de RAG e agentes de IA, integradas a sistemas com Python e FastAPI.',
    resume: 'Baixar currículo',
    contact: 'Contato',
  },
  about: {
    title: 'Sobre mim',
    paragraphs: [
      'Sou ML/AI Engineer com 1 ano de experiência em Inteligência Artificial na Wise Systems, construindo soluções com LLMs e integrando-as a sistemas de software, lado a lado com Machine Learning.',
      'Tenho certificação da IBM em RAG e Agentic AI (10 cursos) e domínio de pipelines de RAG com bancos vetoriais, agentes autônomos e colaborativos, arquiteturas multiagente e o Model Context Protocol (MCP).',
      'Sou graduando em Sistemas de Informação na PUCPR, uso Python e FastAPI como base no back-end e Angular no front-end. Organizado, comunicativo e disciplinado, com visão de negócio e mentalidade colaborativa. Participei de olimpíadas de matemática em nível estadual e nacional.',
    ],
    facts: [
      { label: 'Atualmente', value: 'Wise Systems — ML/AI Engineer' },
      { label: 'Atuação', value: 'LLMs, RAG, Agentes de IA, Machine Learning' },
      { label: 'Formação', value: 'Sistemas de Informação · PUCPR (2027)' },
      { label: 'Idiomas', value: 'Português (nativo) · Inglês (profissional pleno)' },
    ],
    photoAlt: 'Foto de João Vitor',
  },
  expertise: {
    title: 'IA & Machine Learning',
    rag: {
      title: 'RAG',
      text: 'Pipelines de geração aumentada por recuperação com bancos vetoriais e retrievers, para respostas baseadas nos dados da empresa.',
      labels: {
        docs: 'Documentos',
        chunks: 'Chunks',
        embeddings: 'Embeddings',
        vectorDb: 'Banco vetorial',
        question: 'Pergunta',
        embedding: 'Embedding',
        retriever: 'Retriever',
        llm: 'LLM',
        answer: 'Resposta',
      },
      notes: { indexing: 'indexação', query: 'consulta', topK: 'top-k', context: 'contexto + prompt' },
    },
    agents: {
      title: 'Agentes de IA',
      text: 'Agentes autônomos e colaborativos em arquiteturas multiagente, com memória, ferramentas e MCP.',
      labels: {
        orchestrator: 'Orquestrador',
        research: 'Pesquisa',
        tools: 'Ferramentas · MCP',
        memory: 'Memória',
        reviewer: 'Revisor',
      },
    },
    ml: {
      title: 'Machine Learning',
      text: 'Modelos com scikit-learn, pandas e NumPy, aplicados junto com LLMs.',
      note: 'fronteira de decisão',
    },
  },
  certifications: {
    title: 'Certificações',
    certName: 'IBM RAG and Agentic AI — Professional Certificate',
    issuer: 'IBM · Coursera',
    completed: 'Concluído em 11 set 2026',
    courses: '10 cursos',
    capstone: 'Projeto final',
    otherTitle: 'Outros cursos',
    other: [
      'Python: do Básico ao Avançado',
      'Git e GitHub Essenciais para Desenvolvedores',
      'MongoDB: do Básico ao Avançado (com Mongoose e projetos)',
      'Wise Start 6.0 — Programa de Formação e Seleção',
    ],
  },
  stack: {
    title: 'Stack',
    layers: [
      {
        name: 'LLMs & IA Generativa',
        items: ['Prompt engineering', 'Function calling', 'Aplicações multimodais'],
      },
      {
        name: 'RAG',
        items: ['Bancos vetoriais', 'Retrievers', 'Pipelines de RAG'],
      },
      {
        name: 'Agentes de IA',
        items: [
          'LangChain',
          'LangGraph',
          'CrewAI',
          'AutoGen',
          'BeeAI',
          'MCP',
          'Arquiteturas multiagente',
          'Memória e feedback',
        ],
      },
      {
        name: 'Machine Learning',
        items: ['scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
      },
      { name: 'Back-end & APIs', items: ['Python', 'FastAPI', 'APIs RESTful'] },
      { name: 'Front-end', items: ['Angular'] },
      { name: 'DevOps & Cloud', items: ['Git', 'GitHub', 'Docker', 'Jenkins', 'AWS'] },
    ],
  },
  projects: {
    title: 'Projetos',
    links: { repo: 'Repositório', frontend: 'Front-end', backend: 'Back-end' },
    status: { wip: 'Em desenvolvimento', study: 'Estudos' },
    team: 'Em equipe · GANJJ',
    roleLabel: 'Minha atuação',
    roles: {
      'vector-db': 'desenvolvimento dos bancos vetoriais e do LLM provider da organização.',
      'embedding-reranking': 'desenvolvimento dos bancos vetoriais e do LLM provider da organização.',
    },
    descriptions: {
      'brazilian-gliner':
        'Detecção de entidades em textos brasileiros com GLiNER, com foco inicial em documentos, dados de identidade e informações pessoais.',
      'urban-soccer':
        'RPG textual de futebol em que cada partida é narrada em tempo real por IA. O back-end em FastAPI concentra a lógica do jogo, a persistência em MongoDB e uma camada própria de abstração de LLMs (Gemini, Llama via Groq e Cerebras), com narração em áudio pela ElevenLabs. O front-end é em Angular.',
      'vector-db':
        'Microsserviço dedicado ao banco vetorial (ChromaDB) da plataforma de e-commerce GANJJ: upsert em lote, busca semântica KNN com filtro de metadados e recomendações por similaridade de conteúdo e comportamento.',
      'embedding-reranking':
        'Microsserviço de embeddings e reranking da plataforma GANJJ: gera embeddings multilíngues em lote, indexa entidades no banco vetorial e reordena candidatos por similaridade de cosseno.',
      'ibm-rag-agentic-ai':
        'Estudos e projetos do certificado IBM RAG and Agentic AI: RAG com FAISS, agentes especializados, sistemas multiagente com LangGraph e, no projeto final, um chatbot com MCP.',
    },
  },
  contact: {
    title: 'Contato',
    lead: 'Aberto a conversas sobre IA, projetos e oportunidades.',
    copy: 'Copiar e-mail',
    copied: 'Copiado',
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    send: 'Enviar mensagem',
    sending: 'Enviando…',
    sent: 'Mensagem enviada. Obrigado pelo contato!',
    error: 'Não foi possível enviar agora. Tente novamente ou me escreva direto por e-mail.',
    subject: 'Novo contato pelo portfólio',
    whatsappMessage: 'Olá, João! Vi seu portfólio e gostaria de conversar.',
  },
};
