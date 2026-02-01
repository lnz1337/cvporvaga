# CvPorVaga - SaaS de Currículos Otimizados com IA

![CvPorVaga](https://img.shields.io/badge/Status-MVP-green)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3+-cyan)

## 📋 Sobre o Projeto

CvPorVaga é um SaaS que utiliza Inteligência Artificial para otimizar currículos de acordo com vagas específicas. A ferramenta analisa CVs através de sistemas ATS (Applicant Tracking System) e gera versões otimizadas usando a API da OpenAI.

### 🎯 Funcionalidades Principais

- **Scanner ATS Gratuito**: Analise seu currículo e receba um score de 0-100
- **Geração de CV com IA**: Reescreva seu currículo otimizado para vagas específicas
- **Sistema de Créditos**: Modelo freemium com 1 crédito grátis no cadastro
- **Geração de PDF**: Download de currículos profissionais em PDF
- **Autenticação Completa**: Sistema de login/signup com JWT

## 🚀 Tecnologias Utilizadas

### Frontend & Backend
- **Next.js 14+** (App Router)
- **TypeScript**
- **Tailwind CSS** + shadcn/ui components
- **React PDF** (geração de PDFs)

### Banco de Dados
- **Prisma ORM**
- **SQLite** (desenvolvimento) - fácil migração para PostgreSQL

### IA & Integrações
- **OpenAI API** (GPT-4o-mini) para otimização de currículos
- Algoritmo heurístico para análise ATS

### Autenticação
- **JWT** (JSON Web Tokens)
- **bcryptjs** para hash de senhas
- Cookies HTTP-only seguros

## 📦 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn
- Chave da API da OpenAI

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/cvporvaga.git
cd cvporvaga
```

### Passo 2: Instale as Dependências

```bash
npm install
```

### Passo 3: Configure as Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` e adicione suas credenciais:

```env
# Database
DATABASE_URL="file:./dev.db"

# OpenAI - OBRIGATÓRIO
OPENAI_API_KEY="sk-..."

# Auth - Gere uma chave secreta (mínimo 32 caracteres)
JWT_SECRET="sua_chave_secreta_jwt_aqui_min_32_caracteres_aleatoria"

# App
NEXT_PUBLIC_APP_URL="http://localhost:3000"
```

**⚠️ IMPORTANTE**: 
- Obtenha sua chave da OpenAI em: https://platform.openai.com/api-keys
- A chave JWT pode ser qualquer string aleatória de 32+ caracteres

### Passo 4: Configure o Banco de Dados

```bash
# Criar o banco de dados SQLite
npm run db:push

# Popular com dados de teste (opcional)
npm run db:seed
```

### Passo 5: Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse http://localhost:3000 🎉

## 👤 Usuário de Teste

Após executar o seed, você pode fazer login com:

- **Email**: teste@cvporvaga.com
- **Senha**: senha123
- **Créditos**: 10

## 📂 Estrutura do Projeto

```
cvporvaga/
├── app/                      # Rotas do Next.js 14 (App Router)
│   ├── api/                  # API Routes
│   │   ├── auth/            # Autenticação (login, signup, logout)
│   │   ├── ats/             # Análise ATS
│   │   └── cv/              # Geração de CV
│   ├── app/                 # Dashboard (área autenticada)
│   │   ├── ats/            # Scanner ATS
│   │   └── generate/       # Gerador de CV
│   ├── login/              # Página de login
│   ├── signup/             # Página de cadastro
│   ├── pricing/            # Página de preços
│   └── page.tsx            # Landing page
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   └── landing/            # Componentes da landing
├── lib/
│   ├── db.ts              # Prisma client
│   ├── auth.ts            # Funções de autenticação
│   ├── ats-scorer.ts      # Análise ATS heurística
│   ├── openai.ts          # Integração OpenAI
│   └── pdf-generator.tsx  # Geração de PDFs
├── prisma/
│   ├── schema.prisma      # Schema do banco
│   └── seed.ts            # Dados de teste
└── public/
    └── generated-pdfs/    # PDFs gerados
```

## 🎨 Funcionalidades Detalhadas

### 1. Landing Page (/)
- Hero com animações
- Seção de problemas (3 pain points)
- Como funciona (3 passos)
- Prova social
- Tabela de preços (4 planos)
- FAQ (accordion)
- CTA final
- Footer completo

### 2. Autenticação
- **Signup**: Cadastro com email/senha + 1 crédito grátis
- **Login**: Autenticação com JWT em cookies HTTP-only
- **Logout**: Limpeza de sessão
- **Middleware**: Proteção de rotas `/app/*`

### 3. Dashboard (/app)
- Cards para Scanner ATS (grátis)
- Cards para Gerador de CV (consome créditos)
- Visualização de créditos disponíveis
- Estatísticas rápidas

### 4. Scanner ATS (/app/ats)
- Input de currículo (texto)
- Input opcional de vaga
- Análise heurística:
  - Score 0-100
  - Verificação de seções essenciais
  - Análise de keywords (se vaga fornecida)
  - Sugestões de melhoria
- 100% gratuito e ilimitado

### 5. Gerador de CV (/app/generate)
**Wizard em 3 passos**:
1. Cole seu currículo atual
2. Cole a descrição da vaga
3. Receba o CV otimizado

**Processo**:
- Análise ATS do currículo original
- Chamada à API da OpenAI para reescrita
- Geração estruturada (JSON)
- Criação de PDF profissional
- Download do arquivo
- Consome 1 crédito

### 6. Sistema de Créditos
- 1 crédito grátis no cadastro
- Cada geração consome 1 crédito
- Créditos não expiram
- Pacotes: 1, 10, 50 créditos (em desenvolvimento)

## 🔧 Comandos Úteis

```bash
# Desenvolvimento
npm run dev              # Inicia servidor de dev

# Build
npm run build           # Build de produção
npm run start           # Inicia servidor de produção

# Banco de Dados
npm run db:push         # Sincroniza schema com DB
npm run db:seed         # Popular dados de teste

# Lint
npm run lint            # Verificar código
```

## 🗄️ Modelos do Banco de Dados

### User
- id, email, name, passwordHash
- **credits**: saldo de créditos
- Relações: resumes, jobs, generations, purchases

### Resume
- Armazena texto bruto do currículo

### Job
- Armazena descrição da vaga

### Generation
- Registro de cada CV gerado
- Scores ATS (antes/depois)
- JSON do CV otimizado
- Caminho do PDF

### Purchase
- Histórico de compras de créditos (futuro)

## 🧪 Como Testar

### Teste do Scanner ATS
1. Acesse `/app/ats`
2. Cole um currículo de exemplo
3. (Opcional) Cole uma vaga
4. Clique em "Analisar"
5. Veja o score e sugestões

### Teste de Geração de CV
1. Faça login (use o usuário de teste)
2. Acesse `/app/generate`
3. Cole seu currículo no Passo 1
4. Cole uma vaga no Passo 2
5. Clique em "Gerar CV Otimizado"
6. Aguarde ~10-30 segundos
7. Baixe o PDF gerado

## 🎯 Próximos Passos (Roadmap)

- [ ] Integração com Stripe para pagamentos
- [ ] Upload de arquivos PDF/DOCX
- [ ] Página de histórico de gerações
- [ ] Edição manual do CV gerado
- [ ] Templates de CV personalizados
- [ ] Migração para PostgreSQL
- [ ] Deploy em produção (Vercel)
- [ ] Testes automatizados
- [ ] Analytics e métricas

## 🐛 Troubleshooting

### Erro: "OPENAI_API_KEY não definida"
- Certifique-se de ter criado o arquivo `.env`
- Adicione sua chave válida da OpenAI

### Erro no banco de dados
```bash
# Recrie o banco
rm prisma/dev.db
npm run db:push
npm run db:seed
```

### Erro na geração de PDF
- Verifique se a pasta `public/generated-pdfs` existe
- Verifique permissões de escrita

## 📝 Variáveis de Ambiente

| Variável | Descrição | Obrigatória |
|----------|-----------|-------------|
| `DATABASE_URL` | String de conexão do banco | Sim |
| `OPENAI_API_KEY` | Chave da API OpenAI | Sim |
| `JWT_SECRET` | Chave secreta para JWT (32+ chars) | Sim |
| `NEXT_PUBLIC_APP_URL` | URL da aplicação | Sim |

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📄 Licença

Este projeto é um MVP educacional. Sinta-se livre para usar como base para seus projetos.

## 💡 Suporte

Para dúvidas ou problemas:
- Abra uma issue no GitHub
- Email: contato@cvporvaga.com (fictício)

---

**Desenvolvido com ❤️ usando Next.js, TypeScript e OpenAI**
