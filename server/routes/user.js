const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const sendEmail = require('../config/sendEmail');
const uploadCloud = require('../config/uploadCloud');
const mongoose = require('mongoose');

/************************************
1) POST | crea ticket  ***/
router.use('/crea-ticket', (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({message: "You don't have the credentials"});
  }
});

router.post('/crea-ticket', uploadCloud.single('picture'), (req, res) => {
  let today = new Date();
  let date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  if (req.file == undefined) {
    req.file = '';
  }

  const {title, message, service} = req.body;
  let myTicket = new Ticket({
    title: title,
    message: message,
    user: req.session.currentUser._id,
    active: true,
    service: service,
    time: date,
    picture: req.file.url,
  });

  const ticket = myTicket.save(); // save ticket
  const user = User.updateOne(
    // add the new ticket to the customer's tickets array
    {_id: req.body.user},
    {$push: {tickets: myTicket._id}},
    {new: true}
  );

  Promise.all([ticket, user])
    .then(() => {
      res.status(200).json({myTicket});
    })
    .catch(err => {
      res.status(401).json({err});
    })
    .then(() => {
      return User.find({serviceAdmin: req.body.service}).then(serviceAdmins => {
        const maillist = serviceAdmins.map(admin => {
          return admin.email;
        });
        sendEmail(
          process.env.NODEMAILER_EMAIL,
          maillist,
          `Nuovo ticket| ${req.body.title}`,
          req.body.message
        );
      });
    });
});

/**************************
2) GET | find tickets  ***/
router.get('/tickets', (req, res) => {
  Ticket.find({user: mongoose.Types.ObjectId(req.session.currentUser._id)})
    .sort({created_at: -1})
    .then(tickets => {
      res.status(200).json(tickets);
    })
    .catch(err => {
      res.status(401).json(err);
    });
});



module.exports = router;
