export type Lang = 'pt' | 'en';

export interface NavItem {
  id: string;
  label: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface StackLayer {
  name: string;
  items: string[];
}

export interface SiteContent {
  meta: { title: string; description: string };
  a11y: {
    skip: string;
    menu: string;
    close: string;
    language: string;
    themeToLight: string;
    themeToDark: string;
    globe: string;
  };
  nav: NavItem[];
  hero: {
    greeting: string;
    intro: string;
    workplace: string;
    role: string;
    tagline: string;
    resume: string;
    contact: string;
  };
  about: {
    title: string;
    paragraphs: string[];
    facts: Fact[];
    photoAlt: string;
  };
  expertise: {
    title: string;
    rag: {
      title: string;
      text: string;
      labels: {
        docs: string;
        chunks: string;
        embeddings: string;
        vectorDb: string;
        question: string;
        embedding: string;
        retriever: string;
        llm: string;
        answer: string;
      };
      notes: { indexing: string; query: string; topK: string; context: string };
    };
    agents: {
      title: string;
      text: string;
      labels: { orchestrator: string; research: string; tools: string; memory: string; reviewer: string };
    };
    ml: {
      title: string;
      text: string;
      note: string;
    };
  };
  certifications: {
    title: string;
    certName: string;
    issuer: string;
    completed: string;
    courses: string;
    capstone: string;
    otherTitle: string;
    other: string[];
  };
  stack: {
    title: string;
    layers: StackLayer[];
  };
  projects: {
    title: string;
    links: { repo: string; frontend: string; backend: string };
    status: { wip: string; study: string };
    team: string;
    roleLabel: string;
    /** Optional "my role" line, keyed by project id. */
    roles: Record<string, string>;
    descriptions: Record<string, string>;
  };
  contact: {
    title: string;
    lead: string;
    copy: string;
    copied: string;
    name: string;
    email: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    error: string;
    subject: string;
    whatsappMessage: string;
  };
}
