const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const User = require("../models/User");

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    User.findOne({ email }, (err, usuario) => {
      if (!usuario) {
        return done(null, false, {
          message: `Este email: ${email} no esta registrado`
        });
      } else {
        usuario.compararPassword(password, (err, sonIguales) => {
          if (sonIguales) {
            return done(null, usuario);
          } else {
            return done(null, false, { message: "La contraseña no es válida" });
          }
        });
      }
    });
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

exports.estaAutenticado = (req, res, next) => {
  console.log(req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).send("Tienes que hacer login para acceder a este recurso");
};
