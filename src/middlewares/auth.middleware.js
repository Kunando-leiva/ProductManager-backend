const authorization = (roles) => {
  return (req, res, next) => {
    const user = req.user; // Obtén el usuario autenticado desde req.user

    if (!user) {
      return res.status(401).json({ message: "No autorizado" });
    }

    if (roles.includes(user.role) || user.role === "admin") {
      // Si el usuario tiene el rol adecuado o es admin, permite el acceso
      next();
    } else {
      return res.status(403).json({ message: "Acceso prohibido" });
    }
  };
};

export default authorization;




