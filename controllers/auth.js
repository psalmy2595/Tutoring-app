const bcrypt = require("bcryptjs");
const User = require("../models/user");

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  if (!email || !password) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  }

  // if the user already exists
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.json({
        message: "Sorry the user already exists",
      });
    }

    // hash the password
    bcrypt
      .hash(password, 12)
      .then((hashedPassword) => {
        if (hashedPassword) {
          const user = new User({
            email: email,
            password: hashedPassword,
            name: name,
            role: role
          });
          return user.save();
        }
      })
      .then(() => {
        res.json({
          message: "Welcome to my platform",
          email: email,
        });
      })
      .catch((error) => {
        res.json({
          message: "Error!",
          error,
        });
      });
  });
};
