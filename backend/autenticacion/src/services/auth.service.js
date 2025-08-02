const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const speakeasy = require("speakeasy");
const UsuariosRepository = require("../repositories/usuarios.repository");
const ActivacionesRepository = require("../repositories/activaciones.repository");

const JWT_SECRET = process.env.JWT_SECRET || "secreto";
const ACTIVACION_EXPIRACION = 60 * 60 * 24;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const registro = async ({ nombre, email, password, rol }) => {
  const usuarioExistente = await UsuariosRepository.buscarPorEmail(email);
  if (usuarioExistente) throw new Error("El email ya está registrado.");

  const hash = await bcrypt.hash(password, 10);
  const usuario = await UsuariosRepository.crear({
    nombre,
    email,
    password: hash,
    rol,
  });
  console.log("Usuario creado:", usuario);

  const token = jwt.sign({ userId: usuario.id }, JWT_SECRET, {
    expiresIn: ACTIVACION_EXPIRACION,
  });
  await ActivacionesRepository.crear({ usuario_id: usuario.id, token });

  const enlace = `http://localhost:3003/api/auth/activar?token=${token}`;
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Activa tu cuenta",
    text: `Haz clic en el siguiente enlace para activar tu cuenta: ${enlace}`,
  });

  return usuario;
};

const activarCuenta = async (token) => {
  const activacion = await ActivacionesRepository.buscarPorToken(token);
  if (!activacion || activacion.usado)
    throw new Error("Token inválido o ya usado.");

  // Verificar token JWT
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error("Token expirado o inválido.");
  }

  await UsuariosRepository.activar(payload.userId);
  await ActivacionesRepository.marcarUsado(token);
};

const login = async ({ email, password, twofa_token }) => {
  const usuario = await UsuariosRepository.buscarPorEmail(email);
  if (!usuario) throw new Error("Usuario no encontrado.");
  if (!usuario.activo) throw new Error("Cuenta no activada.");

  const valido = await bcrypt.compare(password, usuario.password);
  if (!valido) throw new Error("Contraseña incorrecta.");

  if (usuario.twofa_secret) {
    if (!twofa_token) throw new Error("Código 2FA requerido.");
    const verificado = speakeasy.totp.verify({
      secret: usuario.twofa_secret,
      encoding: "base32",
      token: twofa_token.replace(/\s/g, ""), // Elimina espacios
    });
    if (!verificado) throw new Error("Código 2FA incorrecto.");
  }
  
  // Generar JWT
  const token = jwt.sign(
    { userId: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "1d" }
  );

  return { mensaje: "Login exitoso.", token };
};

// OAuth Google: Genera JWT para usuario autenticado por passport
const generarJWTGoogle = async (usuario) => {
  if (!usuario) throw new Error("Usuario Google no encontrado.");
  return jwt.sign(
    { userId: usuario.id, email: usuario.email, rol: usuario.rol },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
};

const activar2FA = async (userId) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  await UsuariosRepository.guardar2FASecret(userId, secret.base32);
  return secret.otpauth_url; // Para mostrar QR en frontend
};

const verificar2FA = async ({ userId, token }) => {
  const usuario = await UsuariosRepository.buscarPorId(userId);
  if (!usuario || !usuario.twofa_secret) throw new Error("2FA no configurado.");

  const verificado = speakeasy.totp.verify({
    secret: usuario.twofa_secret,
    encoding: "base32",
    token,
  });

  if (!verificado) throw new Error("Código 2FA incorrecto.");
  return true;
};

module.exports = {
  registro,
  activarCuenta,
  login,
  generarJWTGoogle,
  activar2FA,
  verificar2FA,
};
