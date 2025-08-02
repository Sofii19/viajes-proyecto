const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || "secreto";

const verificarJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ mensaje: "Token requerido" });

  const token = authHeader.split(' ')[1];
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = { id: payload.userId, email: payload.email, rol: payload.rol };
    next();
  } catch {
    res.status(401).json({ mensaje: "Token inválido" });
  }
};

module.exports = verificarJWT;