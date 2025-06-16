import prisma from '../../lib/prismaClient.js';
import { z } from 'zod';

export async function listTransactions(req, res) {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return res.status(200).json(transactions);
  } catch (error) {
    console.error('Erro ao listar transações:', error);
    return res.status(500).json({ error: 'Erro interno ao buscar transações' });
  }
}

export async function createTransaction(req, res) {
  const transactionSchema = z.object({
    description: z.string().min(1),
    amount: z.number().positive(),
    type: z.enum(['INCOME', 'EXPENSE']),
    source: z.string().min(1),
  });

  const validation = transactionSchema.safeParse(req.body);

  if (!validation.success) {
    return res.status(400).json({
      error: 'Dados inválidos',
      issues: validation.error.issues,
    });
  }

  const { description, amount, type, source } = validation.data;

  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        description,
        amount: Math.round(amount * 100), // conversão para centavos
        type,
        source,
      },
    });

    return res.status(201).json({
      ...newTransaction,
      amount: (newTransaction.amount / 100).toFixed(2), // devolve como reais formatado
    });
  } catch (error) {
    console.error('Erro ao criar transação:', error);
    return res.status(500).json({ error: 'Erro interno ao criar transação' });
  }
}

export async function getSummary(_, res) {
  try {
    // Totais por tipo
    const [incomeAgg, expenseAgg] = await Promise.all([
      prisma.transaction.aggregate({
        where: { type: 'INCOME' },
        _sum: { amount: true }
      }),
      prisma.transaction.aggregate({
        where: { type: 'EXPENSE' },
        _sum: { amount: true }
      })
    ])

    const income = incomeAgg._sum.amount || 0
    const expenses = expenseAgg._sum.amount || 0
    const balance = income - expenses

    // Status visual
    const status = balance > 0 ? 'azul' : balance < 0 ? 'vermelho' : 'equilibrado'

    // Análise técnica
    const gastoPercentual = income > 0 ? expenses / income : 0
    let analise = 'desorganizado'

    if (income === 0) {
      analise = 'desorganizado'
    } else if (balance < 0 || gastoPercentual >= 1) {
      analise = 'endividado'
    } else if (gastoPercentual <= 0.7) {
      analise = 'superavitário'
    } else {
      analise = 'equilibrado'
    }

    // Gastos por categoria
    const expensesByCategory = await prisma.transaction.groupBy({
      by: ['categoryId'],
      where: { type: 'EXPENSE' },
      _sum: { amount: true }
    })

    const categories = await prisma.category.findMany()
    const expensesDetailed = expensesByCategory.map((item) => {
      const category = categories.find((c) => c.id === item.categoryId)
      return {
        category: category?.name || 'Categoria Desconhecida',
        icon: category?.icon || '',
        total: item._sum.amount
      }
    })

    // Entradas por conta
    const incomeByAccount = await prisma.transaction.groupBy({
      by: ['accountId'],
      where: { type: 'INCOME' },
      _sum: { amount: true }
    })

    const accounts = await prisma.account.findMany()
    const incomeDetailed = incomeByAccount.map((item) => {
      const account = accounts.find((a) => a.id === item.accountId)
      return {
        account: account?.name || 'Conta Desconhecida',
        color: account?.color || '#ccc',
        total: item._sum.amount
      }
    })

    return res.status(200).json({
      income,
      expenses,
      balance,
      status,
      analise,
      expensesByCategory: expensesDetailed,
      incomeByAccount: incomeDetailed
    })
  } catch (error) {
    console.error('Erro ao gerar resumo:', error)
    return res.status(500).json({ error: 'Erro interno ao gerar resumo financeiro' })
  }
}


export async function updateTransaction(req, res) {
  try {
    const { id } = req.params
    const { description, amount, type, source, accountId, categoryId } = req.body

    const transaction = await prisma.transaction.update({
      where: { id },
      data: {
        description,
        amount,
        type,
        source,
        accountId,
        categoryId
      }
    })

    return res.json(transaction)
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao atualizar transação' })
  }
}

export async function deleteTransaction(req, res) {
  try {
    const { id } = req.params

    await prisma.transaction.delete({ where: { id } })

    return res.status(204).send()
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Erro ao deletar transação' })
  }
}