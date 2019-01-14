const db = require("../models");
const nodemailer = require('nodemailer');
require('dotenv').config();

// Defining methods for the TaskssController
module.exports = {
  findAll: function(req, res) {
    
    db.Tasks
      .find(req.query)
      .sort({ date: -1 })
      .populate('user')
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserId: function(req, res) {
    db.Tasks
      .find({ user: req.params.id})
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    db.Tasks
      .create(req.body)
      .then(dbModel => {
        res.json(dbModel);
        console.log("mode is");
        console.log(dbModel);
        if(req.body.selfOrAssigned==="assigned" && dbModel.user !== "" ) {
          console.log("user is "+ dbModel.user);
          db.Users
          .findOne({ _id: dbModel.user })
          .then(user => {
            console.log("user found ");
            console.log("env var "+process.env.EMAIL_ADD);
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
              subject: `Task Assigned: ${dbModel.taskName}`,
              text:
                `Task Details: ${dbModel.taskDetails}\n`+
                `Due Date: ${dbModel.dueDate}`+
                `\n\n Click https://gwtaskmaster.herokuapp.com" `+
                `to access the application and review the tasks.`
            };
    
            console.log('sending mail');
    
            transporter.sendMail(mailOptions, function(err, response) {
              if (err) {
                console.error('there was an error: ', err);
              } else {
                console.log('here is the res: ', response);
                res.status(200).json('Email Sent');
              }
            });

          })
          .catch(err => res.status(422).json(err));

          
        }
      })
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
    db.Tasks
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => {res.json(dbModel)})
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Tasks
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
}
