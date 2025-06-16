import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';

import healthcheckRoutes from './routes/healthcheck.routes.js';
import incomeRoutes from './routes/transactions/income.routes.js';
import expensesRoutes from './routes/transactions/expenses.routes.js';
import transactionsRoutes from './routes/transactions/transactions.routes.js';
import accountRoutes from './routes/accounts.routes.js'
import categoryRoutes from './routes/categories.routes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use(healthcheckRoutes);
app.use(incomeRoutes);
app.use(expensesRoutes);
app.use(transactionsRoutes);
app.use(accountRoutes)
app.use(categoryRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
