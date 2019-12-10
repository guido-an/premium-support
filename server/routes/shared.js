const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const sendEmail = require('../config/sendEmail');
const uploadCloud = require('../config/uploadCloud');
const mongoose = require('mongoose');


/********************************
1) GET ticket by :id |  | same for admin ***/
router.get('/tickets/:id', (req, res) => {
    currentUser = req.session.currentUser;
    Ticket.findById({_id: mongoose.Types.ObjectId(req.params.id)})
      .populate('user')
      .then(ticket => {
        res.status(200).json({ticket, currentUser});
      })
      .catch(err => {
        console.log(err);
        res.status(401).json(err);
      });
  });
  
  /*******************
  2) POST answer  ***/
  router.post('/answer', uploadCloud.single('photo'), (req, res) => {
    const {_id, message, title, userEmail, service} = req.body; // _id, title and userEmail of the ticket (hidden input)
    const currentUser = req.session.currentUser;
  
    let today = new Date();
    minutes = today
      .getMinutes()
      .toString()
      .padStart(2, '0'); // adding a 0 if less then 10
    let date =
      today.getDate() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getFullYear() +
      ' ' +
      ' | ' +
      today.getHours() +
      ':' +
      minutes;
  
    if (req.file == undefined) {
      req.file = '';
    }
  
    let newAnswer = {
      username: currentUser.username,
      message: message,
      time: date,
      admin: currentUser.admin,
      picture: req.file.url,
    };
  
    Ticket.updateOne(
      {_id: _id},
      {$push: {answers: newAnswer}, waitingForAnswer: false},
      {new: true}
    )
      .then(() => {
        if (currentUser.admin) {
          sendEmail(
            process.env.NODEMAILER_EMAIL,
            userEmail,
            `Nuova risposta | ${title}`,
            message + ''
          );
          res.status(200).json({message: 'Thank you for the answer'});
        } else {
          return User.find({serviceAdmin: service})
          .then(serviceAdmins => {
              const maillist = serviceAdmins.map(admin => {
                return admin.email;
              });
              sendEmail(
                process.env.NODEMAILER_EMAIL,
                maillist, // multiple emails
                `Nuovo ticket| ${req.body.title}`,
                req.body.message
              );
              res.status(200).json({message: 'Thank you for the answer'});
            }
          );
        }
      })
      .catch(err => {
        console.log(err);
        res.status(401).json({err: err});
      });
  });


module.exports = router;
