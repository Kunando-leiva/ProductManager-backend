
function errorHandler(err, req, res, next) {
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      res.status(400).json({ error: 'Error de validación' });
    } else if (err.name === 'AuthenticationError') {
        res.status(401).json({ error: 'Error de autenticación' });
    }  else if (err.name === 'NotFoundError') {
      res.status(404).json({ error: 'Recurso no encontrado' });
    } else if (err.name === 'PermissionError') {
        res.status(403).json({ error: 'Permiso denegado' });
    }  else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
    
  }
  
 export default errorHandler;
  