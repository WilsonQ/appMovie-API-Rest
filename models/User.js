const mongoose = require("mongoose");
const { Schema } = mongoose;

// const bcrypt = require("bcryptjs");
const bcrypt = require("bcrypt-nodejs");

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
    avatar: { type: String, required: true },
    password: { type: String, required: true }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  const usuario = this;
  if (!usuario.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      next(err);
    }
    bcrypt.hash(usuario.password, salt, null, (err, hash) => {
      if (err) {
        next(err);
      }
      usuario.password = hash;
      next();
    });
  });
});

UserSchema.methods.compararPassword = function(password, cb) {
  bcrypt.compare(password, this.password, (err, sonIguales) => {
    if (err) {
      return cb(err);
    }
    cb(null, sonIguales);
  });
};

module.exports = mongoose.model("User", UserSchema);
