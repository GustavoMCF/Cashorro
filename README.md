# 💸 Ca$horro – API Back-end

Projeto back-end do sistema **Ca$horro**, criado com foco em boas práticas, padronização e testabilidade.

---

## ✅ Etapas concluídas até agora

### 1. Estrutura e primeiros endpoints

- Criado projeto com `npm init -y`
- Instalado Express, Helmet, Cors, Dotenv, Zod
- Criado o servidor base (`server.js`) com endpoint `/healthcheck`
- Aplicado ESLint com Flat Config + Prettier
- Adicionado script com `nodemon`
- Separadas rotas e controllers em pastas próprias
- Rotas de `/income` e `/expenses` implementadas com dados mockados

### 2. Organização do código

- Estrutura do projeto modularizada com `routes/` e `controllers/`
- Separação por domínio: `transactions/income` e `transactions/expenses`

### 3. Integração com banco de dados

- Instalado e configurado PostgreSQL local
- Instalado Prisma ORM
- Definido modelo `Transaction` com campos:
  - `id` (UUID)
  - `description` (String)
  - `amount` (Int)
  - `type` (INCOME | EXPENSE)
  - `source` (String)
  - `createdAt` (DateTime)
- Executada a migration inicial

### 4. Funcionalidade real de transações

- Implementada rota `GET /transactions` com leitura real do banco
- Implementada rota `POST /transactions` com:
  - Validação com Zod
  - Conversão automática para centavos
  - Retorno formatado como reais

---

## 📦 Tecnologias usadas

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- ESLint Flat Config + Prettier
- Dotenv
- Zod
- Nodemon

---

## 🛠️ Como rodar o projeto

## Scripts disponíveis

- `npm run dev` – inicia o servidor com nodemon
- `npm run lint` – executa o ESLint
- `npm run format` – formata o código com Prettier

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/cashorro.git
cd cashorro
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

- Instale o PostgreSQL
- Crie o banco com o nome `cashorro` ou outro escolhido
- Configure o arquivo `.env` com a URL de conexão:

```env
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/NOME_DO_BANCO?schema=public"
```

### 4. Rode a migration inicial

```bash
npx prisma migrate dev --name init
```

### 5. Inicie o servidor

```bash
npm run dev
```

---

## 🔍 Endpoints disponíveis

| Método | Rota             | Descrição                                     |
|--------|------------------|-----------------------------------------------|
| GET    | `/healthcheck`   | Verifica se a API está online                 |
| GET    | `/transactions`  | Lista todas as transações salvas              |
| POST   | `/transactions`  | Cadastra nova transação com validação e centavos |
| GET    | `/income`        | Mock de ganhos (descontinuar em breve)        |
| GET    | `/expenses`      | Mock de gastos (descontinuar em breve)        |       |

---

## 📂 Estrutura atual

```
.
├── src/
│   ├── controllers/
│   │   └── transactions/
│   │       ├── income.controller.js
│   │       ├── expenses.controller.js
│   │       └── transactions.controller.js
│   ├── routes/
│   │   ├── transactions/
│   │   │   ├── income.routes.js
│   │   │   ├── expenses.routes.js
│   │   │   └── transactions.routes.js
│   │   └── healthcheck.routes.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── .env
├── .gitignore
├── eslint.config.mjs
├── package.json
└── README.md
```
