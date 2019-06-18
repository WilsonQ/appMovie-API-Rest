const User = require("../models/User");
const passport = require("passport");

module.exports = {
  async signup(req, res) {
    console.log("llego ");
    const { email } = req.body;
    try {
      const users = await User.findOne({ email });
      if (users) return res.status(400).send({ error: "user already exists" });
      console.log("body:", req.body);
      const user = await User.create(req.body);
      // const newUser = new User({ name, surname, email, avatar, password });
      console.log("users", user);
      // await newUser.save();
      if (!user) {
        return res.status(400).send({ error: "creating user error" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "You are registered" });
      }
    } catch (error) {
      throw new Error(error);
    }
  },
  async signIn(req, res, next) {
    passport.authenticate("local", (err, User, info) => {
      if (err) {
        next(err);
      }
      if (!User) {
        return res.status(400).json({ error: "Email already in use" });
      }
      req.logIn(User, err => {
        if (err) {
          next(err);
        }
        res.status(200).json({ success: true, msg: "SignIn successfully." });
      });
    })(req, res, next);
  },
  async logout(req, res) {
    req.logout();
    res.status(200).json({ success: true, msg: "Sign out successfully." });
  }
};
