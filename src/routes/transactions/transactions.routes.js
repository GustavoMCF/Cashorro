import {
  createTransaction,
  listTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary
} from '../controllers/transactions/transactions.controller.js'




const router = Router();

router.post('/transactions', createTransaction)
router.get('/transactions', listTransactions)
router.get('/summary', getSummary)
router.put('/transactions/:id', updateTransaction)
router.delete('/transactions/:id', deleteTransaction)

export default router;
