import { Router } from 'express';
import { listTransactions } from '../../controllers/transactions/transactions.controller.js';
import { createTransaction } from '../../controllers/transactions/transactions.controller.js';

const router = Router();

router.get('/transactions', listTransactions);
router.post('/transactions', createTransaction);

export default router;
