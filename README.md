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

- Estrutura modularizada com pastas `routes/`, `controllers/` e `lib/`
- Separação por domínio: `transactions`, `accounts`, `categories`
- Organização das rotas por subpastas: `transactions/income`, `transactions/expenses`, etc.

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
- Implementada rota `GET /summary` com:
  - Cálculo de receitas, despesas e saldo
  - Classificação visual (`azul`, `vermelho`, `equilibrado`)
  - Análise técnica (`superavitário`, `endividado`, etc.)
- Rota `PUT /transactions/:id` para atualização completa
- Rota `DELETE /transactions/:id` para exclusão
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

| Método | Rota               | Descrição                                                                 |
|--------|--------------------|---------------------------------------------------------------------------|
| GET    | `/healthcheck`     | Verifica se a API está online                                             |
| GET    | `/transactions`    | Lista todas as transações salvas                                          |
| POST   | `/transactions`    | Cadastra nova transação com validação e valor em centavos                 |
| PUT    | `/transactions/:id`| Atualiza uma transação existente                                          |
| DELETE | `/transactions/:id`| Remove uma transação                                                      |
| GET    | `/summary`         | Mostra saldo, status (azul/vermelho/equilibrado) e análise técnica        |
| GET    | `/accounts`        | Lista todas as contas                                                     |
| POST   | `/accounts`        | Cria uma nova conta                                                       |
| PUT    | `/accounts/:id`    | Atualiza uma conta existente                                              |
| DELETE | `/accounts/:id`    | Remove uma conta                                                          |
| GET    | `/categories`      | Lista todas as categorias                                                 |
| POST   | `/categories`      | Cria uma nova categoria                                                   |
| PUT    | `/categories/:id`  | Atualiza uma categoria existente                                          |
| DELETE | `/categories/:id`  | Remove uma categoria                                                      |
| GET    | `/income`          | Mock de ganhos                                                            |
| GET    | `/expenses`        | Mock de gastos                                                            |

---

## 📂 Estrutura atual

```
.
├── src/
│   ├── controllers/
│   │   ├── accounts/
│   │   │   └── accounts.controller.js
│   │   ├── categories/
│   │   │   └── categories.controller.js
│   │   └── transactions/
│   │       ├── income.controller.js
│   │       ├── expenses.controller.js
│   │       └── transactions.controller.js
│   ├── routes/
│   │   ├── accounts/
│   │   │   └── accounts.routes.js
│   │   ├── categories/
│   │   │   └── categories.routes.js
│   │   ├── transactions/
│   │   │   ├── income.routes.js
│   │   │   ├── expenses.routes.js
│   │   │   └── transactions.routes.js
│   │   └── healthcheck.routes.js
│   ├── lib/
│   │   └── prismaClient.js
│   └── server.js
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.js
├── .env
├── .gitignore
├── eslint.config.mjs
├── package.json
└── README.md
```

## 🧩 Diagrama Relacional

```dbml
Table Account {
  id String [pk, default: `uuid()`]
  name String
  type AccountType
  color String
  initialBalance Int
  createdAt DateTime [default: `now()`]
}

Table Category {
  id String [pk, default: `uuid()`]
  name String
  type TransactionType
  icon String
  createdAt DateTime [default: `now()`]
}

Table Transaction {
  id String [pk, default: `uuid()`]
  description String
  amount Int
  type TransactionType
  source String
  createdAt DateTime [default: `now()`]
  accountId String [ref: > Account.id]
  categoryId String [ref: > Category.id]
}

Enum AccountType {
  BANK
  CASH
  OTHER
}

Enum TransactionType {
  INCOME
  EXPENSE
}
```
