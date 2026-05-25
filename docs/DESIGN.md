# Design System - Mnemo Client

Este documento define as regras de design visual para o client React da Mnemo. Consulte este arquivo antes de criar ou alterar cores, fontes, espacamentos, componentes visuais ou padroes de layout.

## Personalidade Visual

Mnemo tem uma interface editorial, calma e cultural. O visual deve parecer uma biblioteca social moderna: superficies claras, tons quentes, contrastes suaves, bordas arredondadas, sombras discretas e acentos em vermelho vinho, azul navy, areia e verde.

Evite aparencia excessivamente corporativa, neon, gradientes chamativos ou componentes muito densos.

## Tokens

Os tokens oficiais vivem em `src/styles/theme.css`. Sempre prefira estes tokens antes de criar valores novos.

### Cores

- `--color-primary: #7B1113` - vermelho vinho principal; use para acoes primarias, estados negativos e destaques fortes.
- `--color-primary-soft: #9a2f31` - hover de acoes primarias.
- `--color-primary-tint: #f7e9e9` - fundos suaves relacionados ao primario.
- `--color-sand: #A5907E` - tom areia para detalhes quentes e neutros.
- `--color-sand-soft: #e9e1d8` - hover/fundo neutro aquecido.
- `--color-navy-900: #1D3461` - azul navy forte, usado em tags e elementos institucionais.
- `--color-navy-700: #1F487E` - foco acessivel e acentos azuis.
- `--color-forest: #3E5641` - verde para recomendacao positiva e sucesso.
- `--color-surface: #FBF9F5` - fundo principal da aplicacao.
- `--color-surface-raised: #FFFFFF` - cards e superficies elevadas.
- `--color-surface-muted: #F2EDE4` - fundos secundarios, hovers e areas discretas.
- `--color-ink-900: #1B1A17` - texto principal.
- `--color-ink-700: #3b3a36` - texto secundario forte.
- `--color-ink-500: #6b6a64` - metadados e descricoes.
- `--color-ink-300: #a6a59f` - texto auxiliar fraco.
- `--color-ink-100: #e6e4de` - bordas e divisores.
- `--color-success: #3E5641` - sucesso.
- `--color-warning: #c9a227` - alertas nao destrutivos.
- `--color-danger: #7B1113` - erro ou acao destrutiva.

Use branco puro apenas para superficies elevadas ou texto sobre fundos escuros. Para bordas, prefira `--color-ink-100`.

### Tipografia

- Fonte de titulos: `--font-heading: 'Space Grotesk', 'Inter', system-ui, sans-serif`.
- Fonte de corpo: `--font-body: 'Inter', system-ui, sans-serif`.
- Corpo base: `16px`, `line-height: 1.5`.
- Titulos usam peso `600`, cor `--color-ink-900` e `letter-spacing: -0.01em`.
- Metadados e labels pequenos geralmente usam `12px` a `14px`, peso `600` quando funcionam como badge, tag ou contador.

Mantenha textos de interface em portugues do Brasil.

### Espacamento

Use a escala:

- `--spacing-1: 4px`
- `--spacing-2: 8px`
- `--spacing-3: 12px`
- `--spacing-4: 16px`
- `--spacing-5: 24px`
- `--spacing-6: 32px`
- `--spacing-7: 48px`
- `--spacing-8: 64px`

Gaps internos pequenos ficam entre `--spacing-2` e `--spacing-3`. Separacao entre blocos de pagina geralmente usa `--spacing-4` ou `--spacing-5`.

### Raios, Sombras e Transicoes

- `--radius-sm: 6px` - tags e controles pequenos.
- `--radius-md: 12px` - campos e cards compactos.
- `--radius-lg: 20px` - cards grandes, estados vazios e paineis.
- `--radius-pill: 999px` - botoes, avatares circulares e badges arredondadas.
- `--shadow-sm` - elevacao minima.
- `--shadow-md` - hover/elevacao media.
- `--shadow-lg` - paineis grandes ou elementos em destaque.
- `--transition-fast: 150ms ease` - hover, active e microinteracoes.
- `--transition-base: 220ms ease` - transicoes um pouco mais perceptiveis.

Use sombras com parcimonia. A hierarquia visual deve vir primeiro de espacamento, cor de superficie e borda.

## Layout

- A largura maxima de conteudo e `--content-max-width: 1280px`.
- A navegacao superior usa `--nav-height: 68px`.
- A sidebar usa `--sidebar-width: 260px`.
- Telas autenticadas usam o shell de `AppLayout`: top navigation, sidebar e `main`.
- Layouts principais usam grid com `minmax(0, 1fr)` para evitar overflow.
- Em telas menores, layouts de duas colunas devem colapsar para uma coluna. Use breakpoints locais proximos aos existentes (`900px` e `960px`) quando fizer sentido.

## Componentes Visuais

### Botoes

Use o componente `Button` para acoes padronizadas.

- `primary`: fundo `--color-primary`, texto branco, hover em `--color-primary-soft`.
- `secondary`: fundo `--color-surface-muted`, hover em `--color-sand-soft`.
- `ghost`: transparente, texto `--color-ink-700`, hover em `--color-surface-muted`.
- `outline`: transparente, borda `--color-ink-100`, hover com `--color-primary`.
- Tamanhos: `sm`, `md`, `lg`.
- Botoes devem ser `inline-flex`, centralizados, com `border-radius: var(--radius-pill)` e peso `600`.

### Tags e Badges

- Tags de categoria sao uppercase, pequenas, com `letter-spacing: 0.08em`, fundo `--color-navy-900` e texto branco.
- Badges de recomendacao usam formato pill, peso `600`, fonte `12px` e ponto visual com `currentColor`.
- Tons de recomendacao:
  - positiva: fundo verde translúcido e texto `--color-forest`;
  - neutra: fundo areia translúcido e texto marrom neutro;
  - negativa: fundo vermelho translúcido e texto `--color-primary`.

### Cards e Superficies

- Cards principais devem usar `--color-surface-raised`, borda suave com `--color-ink-100` quando precisar de contorno, e radius `--radius-lg` ou `--radius-md`.
- Estados vazios podem usar borda tracejada `--color-ink-100`, texto centralizado e bastante padding vertical.
- Fundos decorativos devem ser discretos, como gradientes radiais suaves ja usados no shell.

### Formularios

- Inputs, selects e textareas herdam fonte e cor globais.
- Labels devem ser claros e associados a controles via `htmlFor`/`id` quando possivel.
- Contadores e mensagens dinamicas devem usar `aria-live` quando o conteudo muda.
- Estados de erro devem usar `--color-danger`; estados positivos, `--color-success`.

## Acessibilidade Visual

- Preserve o foco global: outline de `2px solid var(--color-navy-700)` com offset de `2px`.
- Nao remova `:focus-visible` sem fornecer alternativa equivalente.
- Garanta contraste suficiente entre texto e fundo, principalmente em badges, tags e botoes.
- Imagens informativas precisam de `alt` significativo; imagens decorativas devem usar `alt=""` e, quando apropriado, `aria-hidden="true"` no container.
- Nao transmita significado apenas por cor; use texto, icone, label ou estrutura junto.

## Criando Novos Padroes

- Primeiro procure um token ou componente existente.
- Se um novo token for inevitavel, adicione em `src/styles/theme.css`, documente neste arquivo e use nome semantico.
- Para variantes, prefira mapas de classes no componente (`variantClassMap`, `sizeClassMap`, `toneClassMap`) em vez de condicoes longas no JSX.
- Evite dependencias externas para necessidades simples de layout, icones, classes ou animacoes.
