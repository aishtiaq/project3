const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const nodemailer = require('nodemailer');
require('dotenv').config();

// Defining methods for the booksController
module.exports = {
  registerUser: function(req, res) {
    db.Users.findOne({ email: req.body.email }).then(user => {
        if (user) {
          return res.status(400).json({ email: "Email already exists" });
        } else {
          const newUser = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            phone: req.body.phone
          };
          
          // Hash password before saving in database
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              db.Users.create(newUser)
                .then(user => {
                  res.json(user);
                  const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: `${process.env.EMAIL_ADD}`,
                      pass: `${process.env.EMAIL_PASS}`
                    },
                  });
          
                  const mailOptions = {
                    from: `gwtaskmaster@gmail.com`,
                    to: `${user.email}`,
                    subject: `Welcome to Task Master`,
                    text:
                      `Welcome to the application!`+
                      `\n\n Click https://gwtaskmaster.herokuapp.com `+
                `to access the application.`
                  };
          
                  console.log('sending mail');
          
                  transporter.sendMail(mailOptions, function(err, response) {
                    if (err) {
                      console.error('there was an error: ', err);
                    } else {
                      console.log('here is the res: ', response);
                      res.status(200).json('recovery email sent');
                    }
                  });
                
                
                
                })
                .catch(err => console.log(err));
            });
          });
        }
      });
  },
  loginUser: function(req, res) {
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    db.Users.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email
          };
  
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600 // 1 hour in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Incorrect Password." });
        }
      });
    });
  },
  findAll: function(req, res) {
    db.Users
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  updateUser: function(req, res) {
    const editUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone
    };
    

    if(req.body.password !== "") {
      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(req.body.password, salt, (err, hash) => {
          if (err) throw err;
          editUser.password = hash;

          db.Users
            .findOneAndUpdate({ _id: req.params.id }, editUser, {new: true})
            .then(user => {
              const payload = {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                phone: user.phone,
                email: user.email
              };

              // Sign token
              jwt.sign(
                payload,
                keys.secretOrKey,
                {
                  expiresIn: 3600 // 1 hour in seconds
                },
                (err, token) => {
                  res.json({
                    success: true,
                    token: "Bearer " + token
                  });
                }
              );
            })
            .catch(err => res.status(422).json(err));
          
        });
      });
    } else {
        db.Users
        .findOneAndUpdate({ _id: req.params.id }, editUser, {new: true})
        .then(user => {
          const payload = {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email
          };

          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 3600 // 1 hour in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        })
        .catch(err => res.status(422).json(err));
  }
  }
}
