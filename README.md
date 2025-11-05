# Desafio Varos - Dashboard de Consultoria

Sistema full-stack de gestão de consultores e clientes desenvolvido com Next.js 16, Prisma ORM e Tailwind CSS.

## 🚀 Tecnologias Utilizadas

- **Next.js 16** - Framework React com Server Components e Server Actions
- **React 19** - Biblioteca para interfaces de usuário
- **TypeScript** - Tipagem estática para JavaScript
- **Prisma ORM** - ORM moderno para gerenciamento do banco de dados
- **SQLite** - Banco de dados leve para desenvolvimento
- **Tailwind CSS 4** - Framework CSS utility-first
- **Zod** - Validação de schemas TypeScript-first
- **Jest** - Framework de testes JavaScript
- **React Testing Library** - Testes de componentes React
- **Red Hat Display** - Fonte Google para tipografia

## ✨ Features Implementadas

### Dashboard
- 📊 Métricas em cards (Total de Clientes com indicador de crescimento)
- 📋 Tabela de clientes com todas as informações (Nome, Email, Telefone, CPF, Idade, Endereço, Datas)
- 🔍 Filtros funcionais por consultor (nome e email)
- 📄 **Paginação** - 5 clientes por página
- 🎨 Interface moderna, responsiva e tema dark (#131313)
- ⚡ Botões de ação (Editar/Excluir) em cada linha

### Gestão de Consultores
- ➕ Criar novos consultores via modal
- ✏️ Editar consultores existentes
- 👥 Adicionar múltiplos clientes a um consultor
- 📋 Listagem com contador de clientes
- ✅ Validação de formulários com Zod

### Gestão de Clientes
- ➕ Criar novos clientes via **modal lateral**
- ✏️ Editar clientes existentes via modal
- 🗑️ Excluir clientes (modo visualização read-only)
- 🔗 Relacionamento obrigatório com consultores
- 💰 Controle de valores monetários
- 📊 Status (Ativo, Inativo, Em Negociação)
- 📍 Informações completas (CPF, Idade, CEP, Estado, Endereço, Complemento)

### Modal de Criação/Edição
- 🎭 Animação suave (slide da direita, 300ms ease-out)
- 📑 Sistema de abas (Informações básica / Adicionar clientes)
- 🔀 Tipo de usuário: Cliente ou Consultor
- 🔒 Modo de visualização read-only para exclusão
- ✅ Validação em tempo real
- 🎯 Botões contextuais (Criar/Atualizar/Deletar)

### Features Técnicas do Next.js 16
- ⚡ **Server Components** - Componentes renderizados no servidor
- 🔄 **Server Actions** - Mutações de dados no servidor
- ⏳ **Suspense** - Carregamento assíncrono de componentes
- 💀 **Loading Skeletons** - Estados de carregamento elegantes
- 🚀 **Cache e Revalidação** - Performance otimizada com `revalidatePath`
- 🎯 **TypeScript** - Type-safety em toda aplicação

## 📦 Instalação

### Pré-requisitos
- Node.js 18+ instalado
- Yarn (recomendado) ou npm

### Passos

1. **Clone o repositório**
```bash
git clone <url-do-repositorio>
cd desafio-varos
```

2. **Instale as dependências**
```bash
yarn install
```

3. **Configure as variáveis de ambiente**
```bash
# O arquivo .env já deve existir com:
DATABASE_URL="file:./dev.db"
```

4. **Execute as migrations e seed do banco de dados**
```bash
# No Windows PowerShell:
$env:DATABASE_URL="file:./dev.db"; yarn prisma migrate dev --name init
$env:DATABASE_URL="file:./dev.db"; yarn db:seed

# No Linux/Mac:
DATABASE_URL="file:./dev.db" yarn prisma migrate dev --name init
DATABASE_URL="file:./dev.db" yarn db:seed
```

5. **Inicie o servidor de desenvolvimento**
```bash
yarn dev
```

6. **Acesse a aplicação**
```
http://localhost:3000
```

## 🗂️ Estrutura do Projeto

```
desafio-varos/
├── actions/                    # Server Actions
│   ├── cliente-actions.ts      # CRUD de clientes
│   └── consultor-actions.ts    # CRUD de consultores
├── app/                        # App Router (Next.js 16)
│   ├── clientes/               # Rotas de clientes
│   │   ├── novo/               # Criar cliente
│   │   └── [id]/editar/        # Editar cliente
│   ├── consultores/            # Rotas de consultores
│   │   ├── novo/               # Criar consultor
│   │   └── [id]/editar/        # Editar consultor
│   ├── dashboard/              # Dashboard principal
│   ├── layout.tsx              # Layout raiz
│   └── page.tsx                # Página inicial (redirect)
├── components/                 # Componentes React
│   ├── dashboard/              # Componentes do dashboard
│   │   ├── clientes-table.tsx  # Tabela de clientes
│   │   ├── filtros.tsx         # Filtros de busca
│   │   └── metricas-cards.tsx  # Cards de métricas
│   ├── forms/                  # Formulários
│   │   ├── cliente-form.tsx    # Formulário de cliente
│   │   └── consultor-form.tsx  # Formulário de consultor
│   ├── layout/                 # Componentes de layout
│   │   └── navbar.tsx          # Barra de navegação
│   └── ui/                     # Componentes UI base
│       ├── badge.tsx           # Badge de status
│       ├── button.tsx          # Botão
│       ├── card.tsx            # Card
│       ├── input.tsx           # Input
│       ├── select.tsx          # Select
│       ├── skeleton.tsx        # Loading skeletons
│       └── table.tsx           # Tabela
├── lib/                        # Utilitários
│   ├── db.ts                   # Cliente Prisma
│   └── validations.ts          # Schemas de validação (Zod)
├── prisma/                     # Configuração Prisma
│   ├── schema.prisma           # Schema do banco de dados
│   └── seed.ts                 # Dados de exemplo
└── package.json                # Dependências
```

## 📊 Modelo de Dados

### Consultor
- `id`: String (CUID)
- `nome`: String
- `email`: String (único)
- `telefone`: String (opcional)
- `clientes`: Relação um-para-muitos com Cliente

### Cliente
- `id`: String (CUID)
- `nome`: String
- `email`: String (único)
- `telefone`: String (opcional)
- `empresa`: String (opcional)
- `valor`: Float
- `status`: Enum (Ativo, Inativo, Em Negociação)
- `consultorId`: String (FK para Consultor)

## 🎯 Scripts Disponíveis

```bash
# Desenvolvimento
yarn dev

# Build de produção
yarn build

# Executar produção
yarn start

# Lint
yarn lint

# Seed do banco de dados
yarn db:seed

# Prisma Studio (visualizar banco)
yarn prisma studio

# Testes
yarn test              # Executar todos os testes
yarn test:watch        # Executar testes em modo watch
yarn test:coverage     # Gerar relatório de cobertura
```

## 🧪 Dados de Exemplo

O seed cria automaticamente:
- 3 consultores (João Silva, Maria Santos, Pedro Costa)
- 9 clientes distribuídos entre os consultores
- Valores e status variados para demonstração

## 🎨 Features de UX/UI

- **Design moderno** seguindo especificações exatas do Figma
- **Tema dark** com paleta de cores personalizada (#131313, #1e1e1e, #2a2a2a)
- **Tipografia** com Red Hat Display para títulos e textos
- **Componentes reutilizáveis** e consistentes
- **Loading states** com skeletons animados
- **Feedback visual** para ações (badges de status coloridos)
- **Modal lateral** com animação slide-in (300ms ease-out)
- **Layout responsivo** - Otimizado para 1920px e mobile
- **Validação de formulários** com mensagens de erro em tempo real
- **Paginação** elegante com controles anterior/próxima
- **Botões de ação** inline na tabela
- **Filtros dinâmicos** com atualização de URL

## 🔒 Validações

- Email único para consultores e clientes
- Campos obrigatórios marcados com *
- Validação de tipos (número para valor, email válido)
- Confirmação antes de excluir dados

## 🧪 Testes Unitários

O projeto inclui uma suíte completa de testes unitários usando **Jest** e **React Testing Library**.

### Cobertura de Testes

- ✅ **50 testes** passando
- ✅ **9 suítes de teste**
- ✅ Componentes UI (Button, Input, Badge, Card, Modal)
- ✅ Validações de formulários (Zod schemas)
- ✅ Componentes do Dashboard (MetricasCards)
- ✅ Utilitários (formatação de moeda e data)

### Executar Testes

```bash
# Rodar todos os testes
yarn test

# Modo watch (re-executa ao salvar arquivos)
yarn test:watch

# Gerar relatório de cobertura
yarn test:coverage
```

### Estrutura de Testes

```
__tests__/
├── integration/          # Testes de integração
│   └── cliente-crud.test.ts
└── utils/                # Testes de utilitários
    └── formatters.test.ts

components/
├── dashboard/__tests__/
│   └── metricas-cards.test.tsx
└── ui/__tests__/
    ├── badge.test.tsx
    ├── button.test.tsx
    ├── card.test.tsx
    ├── input.test.tsx
    └── modal.test.tsx

lib/__tests__/
└── validations.test.ts
```

## ✅ Funcionalidades Implementadas

- [x] Dashboard com métricas e tabelas
- [x] Paginação nas tabelas (5 itens por página)
- [x] Filtros funcionais por consultor
- [x] CRUD completo de clientes e consultores
- [x] Modal lateral com animação
- [x] Validação de formulários com Zod
- [x] Testes unitários (50 testes passando)
- [x] Layout responsivo (1920px e mobile)
- [x] Server Components e Server Actions
- [x] Loading states e Suspense
- [x] Tema dark com design system

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Autenticação e autorização de usuários
- [ ] Busca por texto global
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Gráficos e visualizações avançadas (Charts.js)
- [ ] Histórico de alterações (audit log)
- [ ] Notificações em tempo real (WebSockets)
- [ ] Testes E2E com Playwright
- [ ] Aumentar cobertura de testes para 100%
- [ ] Upload de avatar para usuários
- [ ] Filtro por período (data range picker)
- [ ] Modo de visualização em cards
- [ ] Importação em massa via CSV/Excel

## 📝 Notas de Desenvolvimento

Este projeto demonstra o uso das features mais recentes do Next.js 16:
- **Server Components** por padrão para melhor performance
- **Server Actions** para mutações sem necessidade de API routes
- **Suspense** para carregamento granular de componentes
- **Streaming** com loading.tsx para melhor UX
- **Cache automático** e revalidação com `revalidatePath`

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
