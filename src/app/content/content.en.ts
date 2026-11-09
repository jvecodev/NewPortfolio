import { SiteContent } from './content.model';

export const CONTENT_EN: SiteContent = {
  meta: {
    title: 'João Vitor Oliveira — ML/AI Engineer',
    description:
      'ML/AI Engineer based in Curitiba, Brazil. LLMs, RAG, AI agents and Machine Learning integrated into software with Python, FastAPI and Angular.',
  },
  a11y: {
    skip: 'Skip to content',
    menu: 'Open menu',
    close: 'Close menu',
    language: 'Language',
    themeToLight: 'Switch to light theme',
    themeToDark: 'Switch to dark theme',
    globe: 'Globe showing my location in Curitiba. Drag to rotate.',
  },
  nav: [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'expertise', label: 'AI & ML' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'stack', label: 'Stack' },
    { id: 'contact', label: 'Contact' },
  ],
  hero: {
    greeting: 'Hello!',
    intro: "I'm",
    workplace: '@ Wise Systems',
    role: 'ML/AI Engineer — LLMs · RAG · AI Agents · Machine Learning',
    tagline:
      'I build solutions with LLMs, RAG pipelines and AI agents, integrated into software with Python and FastAPI.',
    resume: 'Download resume',
    contact: 'Contact',
  },
  about: {
    title: 'About me',
    paragraphs: [
      "I'm an ML/AI Engineer with 1 year of experience in AI at Wise Systems, building solutions with LLMs and integrating them into software systems, alongside Machine Learning.",
      "I'm IBM-certified in RAG and Agentic AI (10 courses), with strong command of RAG pipelines with vector databases, autonomous and collaborative agents, multi-agent architectures, and the Model Context Protocol (MCP).",
      "I'm an Information Systems undergraduate at PUCPR, using Python and FastAPI as a back-end foundation and Angular on the front end. Organized, communicative and disciplined, with business vision and a collaborative mindset. I took part in state- and national-level math olympiads.",
    ],
    facts: [
      { label: 'Currently', value: 'Wise Systems — ML/AI Engineer' },
      { label: 'Focus', value: 'LLMs, RAG, AI Agents, Machine Learning' },
      { label: 'Education', value: 'Information Systems · PUCPR (2027)' },
      { label: 'Languages', value: 'Portuguese (native) · English (full professional)' },
    ],
    photoAlt: 'Photo of João Vitor',
  },
  expertise: {
    title: 'AI & Machine Learning',
    rag: {
      title: 'RAG',
      text: "Retrieval-augmented generation pipelines with vector databases and retrievers, for answers grounded in a company's own data.",
      labels: {
        docs: 'Documents',
        chunks: 'Chunks',
        embeddings: 'Embeddings',
        vectorDb: 'Vector DB',
        question: 'Question',
        embedding: 'Embedding',
        retriever: 'Retriever',
        llm: 'LLM',
        answer: 'Answer',
      },
      notes: { indexing: 'indexing', query: 'query', topK: 'top-k', context: 'context + prompt' },
    },
    agents: {
      title: 'AI Agents',
      text: 'Autonomous and collaborative agents in multi-agent architectures, with memory, tools and MCP.',
      labels: {
        orchestrator: 'Orchestrator',
        research: 'Research',
        tools: 'Tools · MCP',
        memory: 'Memory',
        reviewer: 'Reviewer',
      },
    },
    ml: {
      title: 'Machine Learning',
      text: 'Models with scikit-learn, pandas and NumPy, applied together with LLMs.',
      note: 'decision boundary',
    },
  },
  certifications: {
    title: 'Certifications',
    certName: 'IBM RAG and Agentic AI — Professional Certificate',
    issuer: 'IBM · Coursera',
    completed: 'Completed Sep 11, 2026',
    courses: '10 courses',
    capstone: 'Capstone',
    otherTitle: 'Other courses',
    other: [
      'Python Course: Beginner to Advanced',
      'Git and GitHub Essentials for Developers',
      'MongoDB: Beginner to Advanced (with Mongoose and projects)',
      'Wise Start 6.0 — Training and Selection Program',
    ],
  },
  stack: {
    title: 'Stack',
    layers: [
      {
        name: 'LLMs & Generative AI',
        items: ['Prompt engineering', 'Function calling', 'Multimodal applications'],
      },
      {
        name: 'RAG',
        items: ['Vector databases', 'Retrievers', 'RAG pipelines'],
      },
      {
        name: 'AI Agents',
        items: [
          'LangChain',
          'LangGraph',
          'CrewAI',
          'AutoGen',
          'BeeAI',
          'MCP',
          'Multi-agent architectures',
          'Memory and feedback',
        ],
      },
      {
        name: 'Machine Learning',
        items: ['scikit-learn', 'pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter'],
      },
      { name: 'Back-end & APIs', items: ['Python', 'FastAPI', 'RESTful APIs'] },
      { name: 'Front-end', items: ['Angular'] },
      { name: 'DevOps & Cloud', items: ['Git', 'GitHub', 'Docker', 'Jenkins', 'AWS'] },
    ],
  },
  projects: {
    title: 'Projects',
    links: { repo: 'Repository', frontend: 'Front end', backend: 'Back end' },
    status: { wip: 'In progress', study: 'Study' },
    team: 'Team project · GANJJ',
    roleLabel: 'My role',
    roles: {
      'vector-db': "building the organization's vector databases and LLM provider.",
      'embedding-reranking': "building the organization's vector databases and LLM provider.",
    },
    descriptions: {
      'brazilian-gliner':
        'Entity detection in Brazilian Portuguese texts with GLiNER, initially focused on documents, identity data and personal information.',
      'urban-soccer':
        'Text-based football RPG where every match is narrated in real time by AI. The FastAPI back end holds the game logic, MongoDB persistence and a custom LLM abstraction layer (Gemini, Llama via Groq and Cerebras), with audio narration through ElevenLabs. The front end is built with Angular.',
      'vector-db':
        'Microservice dedicated to the vector database (ChromaDB) of the GANJJ e-commerce platform: batch upserts, KNN semantic search with metadata filters and recommendations based on content similarity and behavior.',
      'embedding-reranking':
        'Embedding and reranking microservice for the GANJJ platform: batch multilingual embeddings, entity indexing in the vector database and cosine-similarity reranking of candidates.',
      'ibm-rag-agentic-ai':
        'Studies and projects from the IBM RAG and Agentic AI certificate: RAG with FAISS, specialized agents, multi-agent systems with LangGraph and, in the capstone, an MCP chatbot.',
    },
  },
  contact: {
    title: 'Contact',
    lead: 'Open to conversations about AI, projects and opportunities.',
    copy: 'Copy email',
    copied: 'Copied',
    name: 'Name',
    email: 'Email',
    message: 'Message',
    send: 'Send message',
    sending: 'Sending…',
    sent: 'Message sent. Thanks for reaching out!',
    error: "Couldn't send right now. Please try again or email me directly.",
    subject: 'New contact from portfolio',
    whatsappMessage: "Hi João! I saw your portfolio and I'd like to talk.",
  },
};
