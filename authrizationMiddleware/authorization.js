function authorizeRoles(allowedRoles) {
  return (req, res, next) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ error: "Access denied" });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(400).json({ error: "permission denied" });
    }
    next();
  };
}

module.exports = authorizeRoles;
