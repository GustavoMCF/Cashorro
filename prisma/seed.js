import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  // Criando contas
  const accounts = await prisma.account.createMany({
    data: [
      { name: 'Nubank', type: 'BANK', color: '#8A05BE', initialBalance: 100000 },
      { name: 'Caixa', type: 'BANK', color: '#0047AB', initialBalance: 50000 },
      { name: 'Dinheiro', type: 'CASH', color: '#27AE60', initialBalance: 20000 }
    ]
  })

  // Criando categorias
  const categories = await prisma.category.createMany({
    data: [
      { name: 'Alimentação', type: 'EXPENSE', icon: '🍔' },
      { name: 'Transporte', type: 'EXPENSE', icon: '🚌' },
      { name: 'Salário', type: 'INCOME', icon: '💰' }
    ]
  })

  // Pegando contas e categorias para vincular
  const account = await prisma.account.findFirst({ where: { name: 'Nubank' } })
  const category = await prisma.category.findFirst({ where: { name: 'Salário' } })

  // Criando transações
  if (account && category) {
    await prisma.transaction.createMany({
      data: [
        {
          description: 'Pagamento mensal',
          amount: 500000,
          type: 'INCOME',
          source: 'Empresa X',
          accountId: account.id,
          categoryId: category.id
        }
      ]
    })
  }
}

main()
  .then(() => {
    console.log('✅ Seed executado com sucesso!')
  })
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })