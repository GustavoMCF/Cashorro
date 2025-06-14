export function listExpenses(req, res) {
  return res.status(200).json([
    { id: 1, description: 'Rent', amount: 1200, date: '2025-06-02' },
    { id: 2, description: 'Groceries', amount: 300, date: '2025-06-05' },
  ]);
}
