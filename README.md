# Mnemo — Client

Interface web (React + Vite) da rede social cultural Mnemo.

## Como rodar

```bash
cd mnemo/client
npm install
npm run dev
```

O Vite vai abrir `http://localhost:5173`.

Configure a API com:

```bash
cp .env.example .env
```

## Scripts

- `npm run dev` — inicia o servidor de desenvolvimento com hot reload.
- `npm run build` — gera a versão de produção em `dist/`.
- `npm run preview` — serve localmente o build de produção para conferência.

## Estrutura

```
src/
├── assets/             imagens estáticas (logo)
├── components/
│   ├── feed/           PostCard, FeedFilters
│   ├── friends/        FriendCard
│   ├── layout/         AppLayout, TopNavigation, Sidebar
│   ├── profile/        ProfileHeader
│   ├── review/         ReviewForm
│   └── ui/             Button, Avatar, Checkbox, RecommendationBadge, CategoryTag, Icon
├── api/                client HTTP e chamadas de autenticação
├── auth/               contexto de sessão e proteção de rotas
├── data/               mockData.js (dados fictícios para popular a UI)
├── pages/              LoginPage, SignupPage, HomePage, ProfilePage, CreateReviewPage, FriendsPage, StaticPage
├── styles/             theme.css (variáveis globais) e global.css (reset)
├── App.jsx             roteamento da aplicação
└── main.jsx            ponto de entrada React
```

Uma explicação didática de como o código funciona está em [`EXPLICACAO.md`](./EXPLICACAO.md).
