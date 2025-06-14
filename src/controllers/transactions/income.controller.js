export function listIncome(req, res) {
  return res.status(200).json([
    { id: 1, description: 'Salary', amount: 2500, date: '2025-06-01' },
    { id: 2, description: 'Freelance', amount: 500, date: '2025-06-10' },
  ]);
}
