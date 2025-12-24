export const roleMiddleware = (role) => {
  return (req, res, next) => {
    console.log("USER ROLE: ", req.user.role);
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};
