const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateToken } = require('../utils/auth.js');
const { errorResponse, successResponse } = require('../utils/response.js');

exports.signUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const role = req.body.role;

  if (!email || !password || !name) {
    return res.status(400).send({
      status: false,
      message: "All fields are required",
    });
  }

    if (!role) {
        return errorResponse(res, 400, 'User role must be specified');
    }
    const roles = ['student', 'tutor']

    if (role && roles.indexOf(role) === -1) {
        return errorResponse(res, 400,'You can only sign up as a student or tutor');
    }

  // if the user already exists
  User.findOne({ email }).then((foundUser) => {
    if (foundUser) {
      return res.json({
        message: "Sorry the user already exist",
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
            isTutor: role === 'tutor' ? true : false,
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

exports.getTutors = (req, res) => {
  User.find({ isTutor: true }, (err, foundTutors) => {
    if (err) {
      return errorResponse(res, 422, 'Unable to get tutors')
    }

    return successResponse(res, 200, foundTutors);
  })
}



exports.makeAdmin = (req, res) => {
  const email = req.user;

  User.findOne({ email }, (err, foundUser) => {
    if (err) {
        return errorResponse(res, 422, err)
    }

    if (!foundUser) {
        return errorResponse(res, 404, 'Could not find user');
    }

    if(foundUser.isTutor ===  false) {
        return errorResponse(res, 422, 'Only a tutor can become an admin')
    }
    if(foundUser.isAdmin ===  true) {
        return errorResponse(res, 422, 'You are already an admin')
    }

    foundUser.isAdmin = true
    foundUser.save();
    return successResponse(res, 200, foundUser)
})
}