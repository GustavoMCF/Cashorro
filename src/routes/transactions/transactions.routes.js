import {
  createTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary
} from '../../controllers/transactions/transactions.controller.js'

import { Router } from 'express';


const router = Router();

router.post('/transactions', createTransaction)
router.get('/transactions', listTransactions)
router.get('/summary', getSummary)
router.put('/transactions/:id', updateTransaction)
router.delete('/transactions/:id', deleteTransaction)

export default router;
