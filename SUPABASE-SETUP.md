# 🚀 Configuração do Supabase - Passo a Passo

## ✅ **Passo 1: Executar SQL no Supabase**

1. Abra o [Supabase Dashboard](https://app.supabase.com)
2. Selecione seu projeto
3. No menu lateral, clique em **SQL Editor**
4. Clique em **"New query"**
5. Abra o arquivo `prisma/supabase-setup.sql`
6. **Copie TODO o conteúdo**
7. **Cole no SQL Editor**
8. Clique em **"Run"** (ou Ctrl+Enter)

Você verá no final:
```
Consultores criados: 3
Clientes criados: 9
```

✅ **Tabelas criadas e dados inseridos com sucesso!**

## ⚙️ **Passo 2: Configurar Variáveis na Vercel**

1. Acesse [Vercel Dashboard](https://vercel.com/dashboard)
2. Selecione seu projeto
3. Vá em **Settings** → **Environment Variables**
4. Clique em **"Add New"**

Adicione estas 2 variáveis:

### **Variável 1: DATABASE_URL**
- **Key**: `DATABASE_URL`
- **Value**: `postgresql://postgres:CUSTELINHASHOPW@db.raphpkxvnxwbmasuyqse.supabase.co:5432/postgres`
- **Environments**: Marque ✅ Production, ✅ Preview, ✅ Development
- Clique em **Save**

### **Variável 2: DIRECT_URL**
- **Key**: `DIRECT_URL`
- **Value**: `postgresql://postgres:CUSTELINHASHOPW@db.raphpkxvnxwbmasuyqse.supabase.co:5432/postgres`
- **Environments**: Marque ✅ Production, ✅ Preview, ✅ Development
- Clique em **Save**

## 🔄 **Passo 3: Redeploy na Vercel**

1. Ainda no projeto da Vercel, vá em **Deployments**
2. Encontre o último deployment
3. Clique nos **3 pontinhos (...)** à direita
4. Selecione **"Redeploy"**
5. Confirme clicando em **"Redeploy"** novamente

Aguarde o build (~1-2 minutos)

## 🎉 **Passo 4: Testar**

1. Quando o deploy terminar, clique em **"Visit"**
2. Você deve ver o **Dashboard** com os dados!
3. Teste criar um novo cliente
4. Teste editar e excluir

## ✅ **Checklist**

- [ ] SQL executado no Supabase (viu "Consultores criados: 3"?)
- [ ] DATABASE_URL configurada na Vercel
- [ ] DIRECT_URL configurada na Vercel
- [ ] Redeploy feito
- [ ] App acessível e funcionando

## 🆘 **Se der erro no deploy:**

Veja os logs:
1. Na Vercel, clique no deployment
2. Role até **Build Logs**
3. Procure por erros em vermelho
4. Me envie o erro se precisar de ajuda

## 📝 **Nota Importante**

- **Local (desenvolvimento)**: Continua usando SQLite (`file:./dev.db`)
- **Vercel (produção)**: Usa PostgreSQL do Supabase
- As variáveis de ambiente determinam qual banco usar

Pronto! Agora siga os passos e me avise quando terminar cada um! 🚀

