
# Frontend do Blog API

Cliente frontend para um Blog simples, construído com React + Vite + Tailwind.

Este repositório contém a interface para listar, criar, editar, visualizar e deletar posts. O frontend espera que exista um backend rodando com endpoints REST para posts (ver `src/services/api.ts`).

Funcionalidades

- Listagem de posts com busca
- Visualização de detalhes do post
- Criação, edição e exclusão de posts
- Layout responsivo usando Tailwind CSS

Pré-requisitos

- Node.js (recomendado >= 18)
- npm, yarn ou pnpm
- Backend em execução que exponha os endpoints de posts, acessível a partir do navegador

Início rápido

1. Instale as dependências

```sh
npm install
# ou
# yarn
# pnpm install
```

2. Configurar a URL do backend

O frontend lê a URL base do backend a partir das variáveis de ambiente usadas pelo Vite. Crie um arquivo `.env` na raiz do projeto e adicione:

```env
BACKEND_URL=http://localhost:PORT/posts
```


3. Rodar o servidor de desenvolvimento

```sh
npm run dev
```

Abra http://localhost:5173 no navegador (porta padrão do Vite).


Estrutura principal do projeto

- `index.html` — entrada do Vite
- `src/main.jsx` — bootstrap da aplicação
- `src/App.jsx` — rotas e layout
- `src/pages/` — páginas: HomePage, PostDetailPage, NewPostPage, EditPostPage
- `src/components/` — componentes reutilizáveis: `PostCard.tsx`, `PostForm.tsx`
- `src/services/api.ts` — cliente HTTP que conversa com o backend
- `src/interfaces.ts` — interfaces TypeScript compartilhadas


Contribuindo

- Faça fork do repositório, crie uma branch de feature e abra um pull request.

Licença
MIT


