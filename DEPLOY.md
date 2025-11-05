# 🚀 Guia de Deploy - Supabase + Vercel

## 1️⃣ Configurar Supabase

### Criar Projeto no Supabase

1. Acesse [https://supabase.com](https://supabase.com) e crie uma conta
2. Clique em **"New Project"**
3. Preencha:
   - **Name**: desafio-varos (ou nome de sua escolha)
   - **Database Password**: crie uma senha forte (guarde-a!)
   - **Region**: escolha a mais próxima (ex: South America - São Paulo)
4. Clique em **"Create new project"**
5. Aguarde alguns minutos até o projeto ser provisionado

### Copiar Connection Strings

1. No dashboard do projeto, vá em **Settings** → **Database**
2. Role até **Connection String** → **URI**
3. Copie a **Connection string** (formato: `postgresql://postgres:[YOUR-PASSWORD]@...`)
4. **Importante**: Substitua `[YOUR-PASSWORD]` pela senha que você criou

Você terá duas strings:
- **DATABASE_URL** (Pooling): Para uso em produção
  ```
  postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true
  ```
- **DIRECT_URL** (Direct): Para migrations
  ```
  postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres
  ```

## 2️⃣ Configurar Localmente

### Criar arquivo .env.production

Crie o arquivo `.env.production` na raiz do projeto:

```bash
# Supabase Database URLs
DATABASE_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.xxxxx:[PASSWORD]@aws-0-sa-east-1.pooler.supabase.com:5432/postgres"
```

**⚠️ Substitua pelas suas URLs do Supabase!**

### Executar Migrations e Seed

```bash
# Windows PowerShell:
$env:DATABASE_URL="sua-database-url"; $env:DIRECT_URL="sua-direct-url"; yarn prisma db push
$env:DATABASE_URL="sua-database-url"; yarn db:seed

# Linux/Mac:
DATABASE_URL="sua-database-url" DIRECT_URL="sua-direct-url" yarn prisma db push
DATABASE_URL="sua-database-url" yarn db:seed
```

Ou simplesmente carregue as variáveis do arquivo:

```bash
# Instale dotenv-cli
yarn add -D dotenv-cli

# Execute
dotenv -e .env.production -- yarn prisma db push
dotenv -e .env.production -- yarn db:seed
```

## 3️⃣ Configurar Vercel

### Deploy no Vercel

1. Acesse [https://vercel.com](https://vercel.com)
2. Clique em **"Add New..."** → **"Project"**
3. Importe seu repositório do GitHub
4. **Não clique em Deploy ainda!**

### Configurar Environment Variables

1. Na tela de configuração do projeto, role até **Environment Variables**
2. Adicione as variáveis:

| Nome | Valor |
|------|-------|
| `DATABASE_URL` | Sua URL de pooling do Supabase |
| `DIRECT_URL` | Sua URL direta do Supabase |

3. Selecione **Production**, **Preview** e **Development** para cada variável
4. Agora clique em **"Deploy"**

### Verificar o Deploy

Após o deploy:
1. Abra a URL do projeto
2. Você deve ver o dashboard (pode estar vazio)
3. Clique em "Criar usuário" e adicione dados

### Popular o Banco (Opcional)

Se quiser popular com dados de exemplo:

```bash
# Clone as variáveis de ambiente da Vercel
vercel env pull .env.vercel

# Execute o seed
dotenv -e .env.vercel -- yarn db:seed
```

## 4️⃣ Troubleshooting

### Erro: "Can't reach database server"
- Verifique se as URLs estão corretas
- Confirme que substituiu `[YOUR-PASSWORD]`
- Verifique se o projeto Supabase está ativo

### Erro: "Migrations not run"
- Execute `prisma migrate deploy` localmente apontando para o Supabase
- Ou use `prisma db push` para sincronizar o schema

### Tabelas vazias após deploy
- Execute o seed manualmente usando as URLs de produção
- Ou crie dados através da interface do app

## 5️⃣ Comandos Úteis

```bash
# Ver o banco no Prisma Studio (local)
yarn db:studio

# Push schema sem criar migration
yarn db:push

# Ver logs da Vercel
vercel logs

# Testar build localmente
yarn build
yarn start
```

## 🎯 Checklist de Deploy

- [ ] Projeto criado no Supabase
- [ ] Connection strings copiadas
- [ ] Arquivo `.env.production` criado localmente
- [ ] Schema do Prisma atualizado para PostgreSQL
- [ ] Migrations executadas (`prisma db push`)
- [ ] Seed executado (opcional)
- [ ] Variáveis configuradas na Vercel
- [ ] Deploy realizado na Vercel
- [ ] Aplicação testada em produção

## 📝 Notas Importantes

- **Não commite** arquivos `.env*` no Git
- `.env.local` é para desenvolvimento (SQLite)
- `.env.production` é para produção (PostgreSQL/Supabase)
- A Vercel executa `vercel-build` automaticamente no deploy
- O Supabase tem **500MB grátis** no plano Free

## 🔗 Links Úteis

- [Supabase Dashboard](https://app.supabase.com)
- [Vercel Dashboard](https://vercel.com/dashboard)
- [Prisma com Supabase](https://supabase.com/docs/guides/integrations/prisma)

