import  prisma  from '../../lib/prismaClient.js'

export async function createAccount(req, res) {
  try {
    const { name, type, color, initialBalance } = req.body

    const account = await prisma.account.create({
      data: {
        name,
        type,
        color,
        initialBalance
      }
    })

    return res.status(201).json(account)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao criar conta' })
  }
}

export async function listAccounts(_, res) {
  try {
    const accounts = await prisma.account.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return res.status(200).json(accounts)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao listar contas' })
  }
}

export async function updateAccount(req, res) {
  try {
    const { id } = req.params
    const { name, type, color, initialBalance } = req.body

    const account = await prisma.account.update({
      where: { id },
      data: { name, type, color, initialBalance }
    })

    return res.json(account)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao atualizar conta' })
  }
}

export async function deleteAccount(req, res) {
  try {
    const { id } = req.params

    await prisma.account.delete({ where: { id } })

    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao deletar conta' })
  }
}
