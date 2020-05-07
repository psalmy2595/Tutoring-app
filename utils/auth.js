const jwt = require('jsonwebtoken');
const User = require('../models/user')

const generateToken = (email) => {
    const token = jwt.sign({userId: email}, 'secret');
  
    return token;
}

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization;
    // if no token blame the user
    if (!token) {
        return res.status(401).json({
            status: 'failed',
            message: 'Please include your token'
        })
    }

    jwt.verify(token, 'secret', function(err, decoded) {
        // if error, 
        if (err) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid token'
            })
        }
        if (decoded) {
            console.log('verifyToken -> decoded', decoded)
            // if decoded check if the user exists in the database
            User.findOne({ email: decoded.userId}, (err, foundUser) => {
                if (!foundUser || err) {
                    return res.status(422).json({
                        status: 'failed',
                        message: 'Unable to find this user'
                    })
                }

                req.user = decoded.userId;
                next()
            })
        }
    });

    
}

const isAdmin = (req, res, next) => {
    //get the user's email from req.user
    const email = req.user;

    User.findOne({ email }, (err, foundUser) => {
        if (foundUser.isAdmin === true) {
            next()
        } else {
            return res.status(401).json({
                status: 'failed',
                message: 'Only admin is allowed!'
            })
        }
    })
}


module.exports = { generateToken, verifyToken, isAdmin };










