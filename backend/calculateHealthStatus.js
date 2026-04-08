function calculateHealthStatus(nextDueDate) {
  const today = new Date();

  const diffMs = today - new Date(nextDueDate);

  const overdueDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (overdueDays <= 0) return "healthy";

  if (overdueDays <= 2) return "attention";

  return "critical";
}

module.exports = calculateHealthStatus;