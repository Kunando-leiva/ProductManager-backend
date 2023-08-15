const authorization = (role) => {
    return async (req, res, next) => {
      console.log("Usuario autenticado:", req.user);
      if (!req.user) return res.status(401).json({ message: "Unauthorized en auth.middleware" });
      const { user } = req.user;
      if (user.role !== role) {
        return res.status(403).json({ message: "Forbidden" });
      }
     
      next();
    };
  };
  
  export default authorization;