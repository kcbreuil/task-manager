const isAdmin = () => {
  return (req, res, next) => {
    if (!req.user.admin) {
      return res.status(401).json({ message: 'access denied' });
    }
    next();
  };
};

module.exports = isAdmin;
