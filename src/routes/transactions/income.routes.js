import { Router } from 'express';
import { listIncome } from '../../controllers/transactions/income.controller.js';

const router = Router();

router.get('/income', listIncome);

export default router;
