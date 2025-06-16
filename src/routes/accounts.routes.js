import { Router } from 'express'
import {
  createAccount,
  listAccounts,
  updateAccount,
  deleteAccount
} from '../controllers/accounts/accounts.controller.js'

const router = Router()

router.post('/accounts', createAccount)
router.get('/accounts', listAccounts)
router.put('/accounts/:id', updateAccount)
router.delete('/accounts/:id', deleteAccount)

export default router
