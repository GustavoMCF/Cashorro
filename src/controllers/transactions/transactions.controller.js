import pkg from '@prisma/client';
import { z } from 'zod';

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

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

export async function getSummary(req, res) {
  try {
    const incomeAgg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'INCOME' },
    });

    const expensesAgg = await prisma.transaction.aggregate({
      _sum: { amount: true },
      where: { type: 'EXPENSE' },
    });

    const income = incomeAgg._sum.amount ?? 0;
    const expenses = expensesAgg._sum.amount ?? 0;
    const balance = income - expenses;

    // Status visual
    const status =
      balance > 0 ? 'azul' : balance < 0 ? 'vermelho' : 'equilibrado';

    // Análise técnica
    const gastoPercentual = income > 0 ? expenses / income : 0;
    let analise = 'desorganizado';

    if (income === 0) {
      analise = 'desorganizado';
    } else if (balance < 0 || gastoPercentual >= 1) {
      analise = 'endividado';
    } else if (gastoPercentual <= 0.7) {
      analise = 'superavitário';
    } else {
      analise = 'equilibrado';
    }

    return res.status(200).json({
      income,
      expenses,
      balance,
      status,
      analise,
    });
  } catch (error) {
    console.error('Erro ao gerar resumo:', error);
    return res.status(500).json({ error: 'Erro interno ao gerar resumo financeiro' });
  }
}
