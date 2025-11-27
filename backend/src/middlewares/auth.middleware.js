import { verifyToken } from '../utils/jwt.js';

export const authMiddleware = (roles = []) => {
  return (req, res, next) => {
    const header = req.headers.authorization;
    if (!header) return res.status(401).json({ message: 'Token requerido' });
    const token = header.split(' ')[1];
    try {
      const decoded = verifyToken(token);
      if (roles.length && !roles.includes(decoded.typeUser))
        return res.status(403).json({ message: 'Acceso denegado' });
      req.user = decoded;
      next();
    } catch {
      res.status(401).json({ message: 'Token inválido' });
    }
  };
};
