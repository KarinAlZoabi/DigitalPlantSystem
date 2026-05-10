//RBAC middleware to protect routes

module.exports = function(req, res, next) {
  if (req.user?.role !== "admin") return res.status(403).json({ error: "Admin only" });
  next();
};
