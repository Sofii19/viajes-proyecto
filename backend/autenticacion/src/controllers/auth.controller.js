const AuthService = require("../services/auth.service");

const registro = async (req, res) => {
  try {
    const usuario = await AuthService.registro(req.body);
    res
      .status(201)
      .json({
        mensaje: "Usuario registrado. Revisa tu correo para activar la cuenta.",
        usuario,
      });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const actualizar2FA = async (req, res) => {
  try {
    // Si usas JWT, puedes obtener el id del usuario autenticado
    const userId = req.user ? req.user.id : req.body.userId;
    const { habilitar } = req.body; // habilitar: true para activar, false para desactivar

    const usuario = await AuthService.actualizar2FA({ userId, habilitar });
    res.status(200).json({
      mensaje: habilitar
        ? "Verificación en dos pasos activada correctamente."
        : "Verificación en dos pasos desactivada correctamente.",
      usuario,
    });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const activarCuenta = async (req, res) => {
  try {
    await AuthService.activarCuenta(req.body.token);
    res.json({ mensaje: "Cuenta activada correctamente." });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, twofa_token } = req.body;
    const resultado = await AuthService.login({ email, password, twofa_token });
    res.json(resultado);
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

const loginGoogleCallback = async (req, res) => {
  try {
    const usuario = req.user;

    if (usuario.twofa_secret) {
      const { twofa_token } = req.body;
      if (!twofa_token) {
        return res.status(200).json({ mensaje: "Código 2FA requerido." });
      }
      const speakeasy = require("speakeasy");
      const verificado = speakeasy.totp.verify({
        secret: usuario.twofa_secret,
        encoding: "base32",
        token: twofa_token.replace(/\s/g, ""),
      });
      if (!verificado) {
        return res.status(401).json({ mensaje: "Código 2FA incorrecto." });
      }
    }

    const token = await AuthService.generarJWTGoogle(usuario);
    res.json({ mensaje: "Login con Google exitoso.", token });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

const activar2FA = async (req, res) => {
  try {
    const otpauthUrl = await AuthService.activar2FA(req.user.id);
    res.json({ mensaje: "2FA activado.", otpauthUrl });
  } catch (error) {
    res.status(400).json({ mensaje: error.message });
  }
};

const verificar2FA = async (req, res) => {
  try {
    await AuthService.verificar2FA(req.body);
    res.json({ mensaje: "2FA verificado correctamente." });
  } catch (error) {
    res.status(401).json({ mensaje: error.message });
  }
};

module.exports = {
  registro,
  activarCuenta,
  login,
  loginGoogleCallback,
  activar2FA,
  verificar2FA,
  actualizar2FA
};
