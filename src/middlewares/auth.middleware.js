const authorization = (roles) => {
  return async (req, res, next) => {
    console.log("Usuario autenticado:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized en auth.middleware" });
    }

    // Verifica si el usuario es admin (puede borrar cualquier producto o realizar la acción)
    if (req.user.role === 'admin') {
      return next();
    }

    // Verifica si el usuario tiene el rol adecuado
    if (!roles.includes(req.user.role)) {
      console.log(`Usuario de rol ${req.user.role} no autorizado.`);
      return res.status(403).json({ message: "Forbidden" });
    }

    // Si el usuario cumple con las condiciones adecuadas, permite la acción
    next();
  };
};

export default authorization;

