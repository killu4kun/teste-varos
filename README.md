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

## ✨ Features Implementadas

### Dashboard
- 📊 Métricas em cards (Total de Clientes, Clientes Ativos, Valor Total, Total de Consultores)
- 📋 Tabela de clientes com informações detalhadas
- 🔍 Filtros por consultor e status
- 🎨 Interface moderna e responsiva

### Gestão de Consultores
- ➕ Criar novos consultores
- ✏️ Editar consultores existentes
- 📋 Listagem com contador de clientes
- ✅ Validação de formulários com Zod

### Gestão de Clientes
- ➕ Criar novos clientes
- ✏️ Editar clientes existentes
- 🗑️ Excluir clientes
- 🔗 Relacionamento com consultores
- 💰 Controle de valores
- 📊 Status (Ativo, Inativo, Em Negociação)

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
```

## 🧪 Dados de Exemplo

O seed cria automaticamente:
- 3 consultores (João Silva, Maria Santos, Pedro Costa)
- 9 clientes distribuídos entre os consultores
- Valores e status variados para demonstração

## 🎨 Features de UX/UI

- Design moderno e limpo com Tailwind CSS
- Componentes reutilizáveis e consistentes
- Loading states com skeletons animados
- Feedback visual para ações (badges de status)
- Navegação intuitiva
- Layout responsivo (mobile-friendly)
- Validação de formulários com mensagens de erro

## 🔒 Validações

- Email único para consultores e clientes
- Campos obrigatórios marcados com *
- Validação de tipos (número para valor, email válido)
- Confirmação antes de excluir dados

## 🚀 Próximos Passos (Melhorias Futuras)

- [ ] Autenticação e autorização de usuários
- [ ] Paginação nas tabelas
- [ ] Busca por texto
- [ ] Exportação de relatórios (PDF/Excel)
- [ ] Gráficos e visualizações avançadas
- [ ] Histórico de alterações
- [ ] Notificações em tempo real
- [ ] Testes unitários e E2E

## 📝 Notas de Desenvolvimento

Este projeto demonstra o uso das features mais recentes do Next.js 16:
- **Server Components** por padrão para melhor performance
- **Server Actions** para mutações sem necessidade de API routes
- **Suspense** para carregamento granular de componentes
- **Streaming** com loading.tsx para melhor UX
- **Cache automático** e revalidação com `revalidatePath`

## 📄 Licença

Este projeto foi desenvolvido como parte de um desafio técnico.
