import { Router } from 'express';
import { listTransactions } from '../../controllers/transactions/transactions.controller.js';

const router = Router();

router.get('/transactions', listTransactions);

export default router;
