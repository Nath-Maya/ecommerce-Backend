const roleAuth = (role) => {
  return async (req, res, next) => {
    const user = req.user;
    if (!user || req.role !== role)
      return res.status(401).json({ status: "Error", message: "No auth" });
    next();
  };
};

export default roleAuth;
