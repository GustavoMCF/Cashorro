import { Router } from 'express'
import {
  createCategory,
  listCategories,
  updateCategory,
  deleteCategory
} from '../controllers/categories/categories.controller.js'

const router = Router()

router.post('/categories', createCategory)
router.get('/categories', listCategories)
router.put('/categories/:id', updateCategory)
router.delete('/categories/:id', deleteCategory)

export default router