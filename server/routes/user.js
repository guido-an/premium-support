const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const sendEmail = require('../config/sendEmail');
const uploadCloud = require('../config/uploadCloud');

/************************************
1) POST crea-ticket | crea ticket  ***/
router.use('/crea-ticket', (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.status(401).json({message: "You don't have the credentials"});
  }
});

router.post('/crea-ticket', uploadCloud.single('picture'), (req, res) => {
  /* new ticket */
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

    .then(user => {
      res.status(200).json({myTicket});
    })
    .catch(err => {
      res.status(401).json({err});
    });

  User.findOne({serviceAdmin:  req.body.service})
  .then(serviceAdmin => {
      sendEmail(
        process.env.NODEMAILER_EMAIL,
        serviceAdmin.email,
        `Nuovo ticket| ${req.body.title}`,
        req.body.message + '<br><br><a href="http://support.vanillamarketing.it/admin">Ticket</a>'
      );
  });
});

module.exports = router;
