import { prisma } from '../../lib/prismaClient.js'

export async function createCategory(req, res) {
  try {
    const { name, type, icon } = req.body

    const category = await prisma.category.create({
      data: { name, type, icon }
    })

    return res.status(201).json(category)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao criar categoria' })
  }
}

export async function listCategories(_, res) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return res.status(200).json(categories)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao listar categorias' })
  }
}

export async function updateCategory(req, res) {
  try {
    const { id } = req.params
    const { name, type, icon } = req.body

    const category = await prisma.category.update({
      where: { id },
      data: { name, type, icon }
    })

    return res.json(category)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao atualizar categoria' })
  }
}

export async function deleteCategory(req, res) {
  try {
    const { id } = req.params

    await prisma.category.delete({ where: { id } })

    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao deletar categoria' })
  }
}
