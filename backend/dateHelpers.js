

export const daysBetween = (targetDate) => {
  if (!targetDate) return 0;
  
  const today = new Date();
  const target = new Date(targetDate);
  
  // Reset time to midnight for accurate day calculation
  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);
  
  const diffInMs = target.getTime() - today.getTime();
  return Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
};