# 🚀 Quick Start - CvPorVaga

## Começar em 3 Minutos

### 1️⃣ Instalar Dependências (1 min)

```bash
cd cvporvaga
npm install
```

### 2️⃣ Configurar Variáveis de Ambiente (1 min)

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env e adicionar sua chave OpenAI
nano .env  # ou use seu editor favorito
```

**Adicione no .env**:
```env
OPENAI_API_KEY="sk-sua-chave-aqui"
JWT_SECRET="qualquer-string-aleatoria-de-32-caracteres-ou-mais"
```

🔑 **Onde obter a chave OpenAI**: https://platform.openai.com/api-keys

### 3️⃣ Configurar Banco de Dados e Rodar (1 min)

```bash
# Criar banco SQLite e popular com dados de teste
npm run db:push
npm run db:seed

# Iniciar servidor
npm run dev
```

**Pronto!** Acesse: http://localhost:3000

---

## 👤 Login de Teste

Após o seed, você pode fazer login com:

- **Email**: `teste@cvporvaga.com`
- **Senha**: `senha123`
- **Créditos**: 10 (para testar geração de CVs)

---

## 🎯 Fluxo de Teste Rápido

### Teste 1: Scanner ATS Grátis
1. Acesse http://localhost:3000/app/ats (sem login necessário para ver a UI)
2. Cole um currículo de exemplo
3. Veja o score e sugestões

### Teste 2: Gerar CV com IA
1. Faça login com o usuário de teste
2. Acesse "Gerar CV otimizado"
3. Cole seu currículo → Próximo
4. Cole uma vaga → Gerar
5. Aguarde ~15-30 segundos
6. Baixe o PDF gerado

---

## 📁 Estrutura Simplificada

```
cvporvaga/
├── app/
│   ├── page.tsx           → Landing page
│   ├── login/             → Página de login
│   ├── signup/            → Página de cadastro
│   └── app/               → Dashboard (autenticado)
│       ├── ats/           → Scanner ATS grátis
│       └── generate/      → Gerar CV com IA
│
├── components/
│   ├── ui/                → Componentes reutilizáveis
│   └── landing/           → Componentes da landing
│
├── lib/
│   ├── auth.ts            → Autenticação JWT
│   ├── ats-scorer.ts      → Análise ATS
│   ├── openai.ts          → Integração OpenAI
│   └── pdf-generator.tsx  → Geração de PDFs
│
└── prisma/
    └── schema.prisma      → Modelos do banco
```

---

## 🛠️ Comandos Úteis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run db:push      # Atualizar banco de dados
npm run db:seed      # Popular com dados de teste
```

---

## ⚠️ Problemas Comuns

### "OPENAI_API_KEY não definida"
→ Certifique-se de criar o arquivo `.env` e adicionar sua chave

### Erro no banco de dados
```bash
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### Porta 3000 em uso
```bash
# Use outra porta
PORT=3001 npm run dev
```

---

## 💡 Próximos Passos

Depois de testar o MVP:

1. ✅ Explore todas as funcionalidades
2. 📝 Leia o README.md completo
3. 🎨 Customize cores e layout
4. 🚀 Adicione pagamentos (Stripe)
5. 📊 Implemente analytics
6. 🌐 Deploy em produção

---

## 📧 Suporte

- Leia a documentação completa: `README.md`
- Verifique o código-fonte
- Ajuste conforme suas necessidades

**Bom desenvolvimento! 🎉**
