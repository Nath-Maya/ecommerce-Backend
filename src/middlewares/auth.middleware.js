/*
const roleAuth = (role) => {
  return async (req, res, next) => {
    const user = req.user;
    if (!user || req.role !== role)
      return res.status(401).json({ status: "Error", message: "No auth" });
    next();
  };
};

export default roleAuth;
*/

const isAdmin = (req, res, next) => {
  const user = req.session.user;

  if (!user || user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};

const isUser = (req, res, next) => {
  const user = req.session.user;

  if (!user || user.role !== 'user') {
    return res.status(403).json({ message: 'Forbidden' });
  }

  next();
};

export { isAdmin, isUser };