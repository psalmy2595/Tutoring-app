const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require('../utils/auth.js');

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  if (!email || !password || !name) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
      fields: ['email', 'password', 'name']
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
        const token = generateToken(email);
        res.json({
          message: "Welcome to my platform",
          email: email,
          token
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


exports.signIn = (req, res) => {
  const { email, password } = req.body;

  // check if email and password is available
  if (!email || !password) {
    return res.status(400).json({
      message: 'Email and password is required'
    })
  }
  // find the user if they exist
  User.findOne({ email }, (err, foundUser) => {
  console.log('exports.signIn -> foundUser', foundUser)
    if(!foundUser) {
      return res.status(404).json({
        message: 'Sorry, this user does not exist please signup'
      })
    }
    // confirm if the password matches
    bcrypt.compare(password, foundUser.password, (err, response) => {
      if (err) {
        return res.status(400).json({
          message: 'Error',
          error: err
        })
      }
      if (response) {
        // send them a token
        const token = generateToken(email);

        return res.status(200).json({
          status: 'success',
          email,
          token
        })
      } else {
        return res.status(400).json({
          status: 'failed',
          message: 'Incorrect password'
        })
      }
    })
  })
}