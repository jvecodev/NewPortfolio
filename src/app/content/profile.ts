/**
 * Language-agnostic data: links, coordinates, proper names and project metadata.
 * Everything that needs translation lives in content.pt.ts / content.en.ts.
 */
export const PROFILE = {
  name: 'João Vitor Correa Oliveira',
  firstName: 'João Vitor',
  lastName: 'Correa Oliveira',
  email: 'jvitor.oliveira1803@gmail.com',
  phone: '+55 (41) 98873-4741',
  whatsapp: '5541988734741',
  linkedin: 'https://www.linkedin.com/in/jwoliveira/',
  github: 'https://github.com/jvecodev',
  resume: 'assets/documents/Resume_AI_Engineer_Joao_Vitor.pdf',
  photo: 'assets/img/me.jpg',
  home: {
    city: 'Curitiba',
    lat: -25.4284,
    lon: -49.2733,
    timeZone: 'America/Sao_Paulo',
  },
} as const;

/** Official course titles of the IBM RAG and Agentic AI Professional Certificate. */
export const IBM_COURSES: readonly string[] = [
  'Develop Generative AI Applications: Get Started',
  'Build RAG Applications: Get Started',
  'Vector Databases for RAG: An Introduction',
  'Advanced RAG with Vector Databases and Retrievers',
  'Build Multimodal Generative AI Applications',
  'Fundamentals of Building AI Agents',
  'Agentic AI with LangChain and LangGraph',
  'Agentic AI with LangGraph, CrewAI, AutoGen and BeeAI',
  'Build AI Agents using MCP',
  'RAG and Agentic AI Capstone Project',
];

export type ProjectStatus = 'wip' | 'study';
export type ProjectLinkKind = 'repo' | 'frontend' | 'backend';

export interface ProjectMeta {
  id: string;
  name: string;
  links: readonly { kind: ProjectLinkKind; url: string }[];
  tech: readonly string[];
  status?: ProjectStatus;
  /** Team project inside the GANJJ organization (Back-End-Cloud-Computing). */
  team?: boolean;
}

/** Projects shown in the "Projects" section. Descriptions are keyed by `id` in the content files. */
export const PROJECTS: readonly ProjectMeta[] = [
  {
    id: 'brazilian-gliner',
    name: 'Brazilian GLiNER',
    links: [{ kind: 'repo', url: 'https://github.com/jvecodev/brazilian-gliner' }],
    tech: ['Python', 'GLiNER', 'NER'],
    status: 'wip',
  },
  {
    id: 'urban-soccer',
    name: 'Urban Soccer',
    links: [
      { kind: 'backend', url: 'https://github.com/jvecodev/urbansoccer-server' },
      { kind: 'frontend', url: 'https://github.com/jvecodev/urban-soccer' },
    ],
    tech: ['FastAPI', 'MongoDB', 'Gemini', 'Groq', 'Cerebras', 'ElevenLabs', 'Angular', 'Docker'],
  },
  {
    id: 'vector-db',
    name: 'Vector DB',
    links: [{ kind: 'repo', url: 'https://github.com/jvecodev/vector-db-original' }],
    tech: ['Python', 'FastAPI', 'ChromaDB', 'Docker', 'Prometheus'],
    team: true,
  },
  {
    id: 'embedding-reranking',
    name: 'Embedding & Reranking',
    links: [{ kind: 'repo', url: 'https://github.com/jvecodev/embedding-reranking-original' }],
    tech: ['Python', 'FastAPI', 'sentence-transformers', 'Docker', 'Kubernetes'],
    team: true,
  },
  {
    id: 'ibm-rag-agentic-ai',
    name: 'IBM RAG & Agentic AI',
    links: [{ kind: 'repo', url: 'https://github.com/jvecodev/IBM_RAG_Agentic-AI' }],
    tech: ['Python', 'watsonx.ai', 'LangChain', 'LangGraph', 'LlamaIndex', 'FAISS'],
    status: 'study',
  },
];
