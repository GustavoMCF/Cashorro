import { Router } from 'express';
import { listExpenses } from '../../controllers/transactions/expenses.controller.js';

const router = Router();

router.get('/expenses', listExpenses);

export default router;
