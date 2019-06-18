const express = require("express");
const api = express.Router();
const passportConfig = require("../config/passport");
// Controladores
const userCtrl = require("../controllers/userCtrl");

/*************************
 **		END POINTS		**
 *************************/

// Ruta para registro de usuarios
api.post("/signup", userCtrl.signup);

// Ruta para inicio de sesión de usuario
api.post("/signin", userCtrl.signIn);

// Ruta para cerrar sesion  usuarios
api.get("/logout", userCtrl.logout);
// Ruta para mostrar datos del usuarios
api.get("/usuarioInfo", passportConfig.estaAutenticado, (req, res) => {
  res.json(req.user);
});

module.exports = api;
