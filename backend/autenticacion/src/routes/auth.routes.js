const express = require("express");
const passport = require("passport");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const verificarJWT = require("../middlewares/auth.middleware");

router.post("/2fa/activar", verificarJWT, AuthController.activar2FA);

router.post("/registro", AuthController.registro);

router.post("/activar", AuthController.activarCuenta);

router.post("/login", AuthController.login);

router.patch("/actualizar2FA", AuthController.actualizar2FA);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  AuthController.loginGoogleCallback
);

router.post("/2fa/activar", AuthController.activar2FA); // Para activar 2FA y obtener el QR/secret
router.post("/2fa/verificar", AuthController.verificar2FA); // Para verificar el código 2FA en login

module.exports = router;
