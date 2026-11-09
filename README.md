# Portfólio — João Vitor Oliveira

**ML/AI Engineer · LLMs · RAG · AI Agents** — Curitiba, Brasil

Portfólio pessoal minimalista com a identidade de sempre — âmbar `#ffb637`, **Inter Tight** e acentos manuscritos em **Caveat** — com foco em IA: diagramas animados de um pipeline de **RAG**, de uma arquitetura **multiagente** e de um classificador de **Machine Learning**. Um globo interativo marca Curitiba. Disponível em português e inglês, com tema claro e escuro.

## Stack

- **Angular 22** (standalone components, signals, zoneless)
- **d3-geo** + **topojson-client** + **world-atlas** — globo em canvas
- **Vitest** — testes unitários
- **FormSubmit** (AJAX) — formulário de contato
- **GitHub Actions → GitHub Pages** — deploy

## Rodando localmente

```bash
npm install
npm start          # http://localhost:4200
npm test           # testes unitários
npm run build      # build de produção em dist/portfolio/browser
```

## Onde editar o conteúdo

| O quê | Arquivo |
| --- | --- |
| Textos em português | `src/app/content/content.pt.ts` |
| Textos em inglês | `src/app/content/content.en.ts` |
| Links, contatos, localização, cursos IBM, projetos (repositório, tecnologias, status) | `src/app/content/profile.ts` |
| Tokens de cor, fontes e layout global | `src/styles.css` |
| Imagens e currículo | `public/assets/` |

Para adicionar um projeto: inclua-o em `PROJECTS` (`profile.ts`) com o link do repositório, as tecnologias e, se quiser, um `status` (`wip` = em desenvolvimento, `study` = estudos); depois adicione a descrição com o mesmo `id` em `projects.descriptions` nos dois arquivos de idioma — um teste garante que nenhum idioma fique sem descrição.

## Deploy

O workflow `.github/workflows/deploy.yml` testa, compila e publica no GitHub Pages a cada push na `main`. Em **Settings → Pages → Build and deployment**, a fonte deve ser **GitHub Actions**.
