# AGENTS.md - Mnemo Client

Orientacoes para agentes trabalhando no client React/Vite da aplicacao Mnemo.

## Escopo

Este arquivo se aplica a todo o diretorio `client/`.

## Stack

- React 18 com Vite.
- JavaScript com JSX; nao introduza TypeScript sem uma migracao explicita.
- Roteamento com `react-router-dom`.
- Estilos com CSS Modules por componente/pagina, mais tokens globais em `src/styles/theme.css` e reset/base em `src/styles/global.css`.

## Arquitetura

- `src/main.jsx` deve continuar sendo apenas o bootstrap da aplicacao: `StrictMode`, `BrowserRouter`, imports globais e render do `App`.
- `src/App.jsx` concentra a declaracao de rotas. Use `AppLayout` como rota pai para telas autenticadas/com navegacao lateral e superior.
- `src/pages/` contem telas completas e orquestra estado local, filtros, navegacao e composicao de componentes.
- `src/components/layout/` contem estrutura persistente de pagina, como `AppLayout`, `TopNavigation` e `Sidebar`.
- `src/components/ui/` contem componentes reutilizaveis e sem regra de negocio pesada, como `Button`, `Avatar`, `Checkbox`, `CategoryTag`, `RecommendationBadge` e `Icon`.
- Subpastas de dominio em `src/components/` agrupam componentes de uma feature: `feed`, `friends`, `profile`, `review`.
- `src/data/mockData.js` centraliza dados ficticios e constantes compartilhadas enquanto nao houver API.

## Componentes React

- Escreva componentes como funcoes nomeadas e export default no final do arquivo.
- Mantenha componentes pequenos e declarativos. Deixe paginas comporem dados/estado e componentes apresentacionais receberem props claras.
- Para listas, use chaves estaveis vindas dos dados (`id`, `to`, `url`) e evite usar indice quando houver identificador.
- Para estado derivado ou filtros, prefira `useMemo` quando a computacao depender de estado local e colecoes.
- Handlers de formulario devem chamar `event.preventDefault()` e validar antes de acionar callbacks externos.
- Preserve acessibilidade basica: `alt` significativo em imagens informativas, `alt=""` em imagens decorativas, `aria-label` em navs, `aria-live` para mensagens dinamicas e `type="button"` em botoes que nao submetem formulario.

## Estilos e Design

- Antes de tomar qualquer decisao de design, consulte `docs/DESIGN.md` e mantenha novas escolhas alinhadas a esse guia.
- Crie um arquivo `.module.css` ao lado de cada componente/pagina que precise de estilos proprios.
- Importe CSS Modules como `styles` e use `className={styles.nomeDaClasse}`.
- Use os tokens de `theme.css` para cores, espacamentos, raios, sombras, fontes, transicoes e larguras. Evite valores soltos quando ja existir token equivalente.
- Preserve a identidade visual atual: superficie clara, bordas suaves, radius generoso, sombras discretas, vermelho primario, tons areia/navy/forest e tipografia de heading via `--font-heading`.
- Para variantes visuais, siga o padrao de mapas de classes (`variantClassMap`, `sizeClassMap`, `toneClassMap`) em vez de condicionais extensas no JSX.
- Responsividade deve ficar no CSS Module do componente/pagina, usando breakpoints locais como os existentes (`900px`, `960px`) quando fizer sentido.

## Roteamento e Navegacao

- Adicione novas rotas em `src/App.jsx`.
- Use `NavLink` para links que precisam refletir estado ativo.
- Use `useNavigate` para acoes imperativas, como envio de login fake ou botoes de chamada para uma rota.
- A rota curinga deve continuar redirecionando para `/` com `replace`, salvo mudanca explicita de produto.

## Dados e Contratos

- Reutilize `MEDIA_CATEGORIES` e `RECOMMENDATION_TYPES` para categorias, labels, ids e tons de recomendacao.
- Se adicionar dados mockados, mantenha formato consistente com `feedPosts`, `userPosts`, `friends` e `currentUser`.
- Evite duplicar labels ou ids de categorias nos componentes; derive da fonte central quando possivel.

## Convencoes de Codigo

- Use imports relativos com extensao `.jsx`/`.js`, como o restante do projeto.
- Mantenha strings de interface em portugues do Brasil.
- Prefira nomes claros em ingles para variaveis, funcoes, componentes e classes CSS; preserve textos exibidos em portugues.
- Nao adicione dependencias novas para problemas pequenos de UI, composicao de classes ou estado local.
- Antes de finalizar mudancas relevantes, rode `npm run build` dentro de `client/` quando possivel.
