export function getHealthcheck(req, res) {
  return res.status(200).json({
    status: 'ok',
    message: 'API Ca$horro está no ar 🚀',
  });
}
