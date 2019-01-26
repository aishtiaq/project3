const cron = require("node-cron");
const db = require("./models");
const nodemailer = require('nodemailer');
require('dotenv').config();
const moment = require("moment");

module.exports = {
    scheduler: function() {
        cron.schedule("0 0 0 * * *", function () {
            console.log("Job running");
            today = moment();
            in2Days = moment().add(2,'days');
            
            db.Tasks
            .find({ dueDate: {$lte: today}, status: {$ne: 'Done'}, user: {$ne: null}})
            .populate('user')
            .then(dbModel => {
              
                for(var i=0; i<dbModel.length; i++) {

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: `${process.env.EMAIL_ADD}`,
                          pass: `${process.env.EMAIL_PASS}`
                        },
                      });
                      const mailOptions = {
                        from: `gwtaskmaster@gmail.com`,
                        to: `${dbModel[i].user.email}`,
                        subject: `Task Overdue: ${dbModel[i].taskName}`,
                        text:
                          `Task Details: ${dbModel[i].taskDetails}\n`+
                          `Due Date: ${dbModel[i].dueDate}`+
                          `\n\n Click https://gwtaskmaster.herokuapp.com `+
                          `to access the application and review the tasks.`
                      };
              
                      console.log('sending mail');
              
                      transporter.sendMail(mailOptions, function(err, response) {
                        if (err) {
                          console.error('there was an error: ', err);
                        } else {
                          console.log('here is the res: ', response);
                        }
                      });
                }
               
            })
            .catch(err => console.log(err));

            db.Tasks
            .find({ dueDate: {$gte: today, $lte: in2Days}, status: {$ne: 'Done'}, user: {$ne: null}})
            .populate('user')
            .then(dbModel => {
                for(var i=0; i<dbModel.length; i++) {

                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: `${process.env.EMAIL_ADD}`,
                          pass: `${process.env.EMAIL_PASS}`
                        },
                      });
                      const mailOptions = {
                        from: `gwtaskmaster@gmail.com`,
                        to: `${dbModel[i].user.email}`,
                        subject: `Task Due Date Reminder: ${dbModel[i].taskName}`,
                        text:
                          `Task Details: ${dbModel[i].taskDetails}\n`+
                          `Due Date: ${dbModel[i].dueDate}`+
                          `\n\n Click https://gwtaskmaster.herokuapp.com `+
                          `to access the application and review the tasks.`
                      };
              
                      console.log('sending mail');
              
                      transporter.sendMail(mailOptions, function(err, response) {
                        if (err) {
                          console.error('there was an error: ', err);
                        } else {
                          console.log('here is the res: ', response);
                        }
                      });
                }
               
            })
            .catch(err => console.log(err));
        })
    }
    
    

}