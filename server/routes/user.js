const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const sendEmail = require('../config/sendEmail');
const uploadCloud = require('../config/uploadCloud');
const mongoose = require('mongoose')

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
    today.getDate() +
    '-' +
    (today.getMonth() + 1) +
    '-' +
    today.getFullYear()

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

/**************************
2) GET | find tickets  ***/
router.get('/tickets', (req, res) => {
  Ticket.find({user: mongoose.Types.ObjectId(req.session.currentUser._id)})
  .then(tickets => {
    res.status(200).json(tickets)
  })
  .catch(err => {
    res.status(401).json(err)
  })
})

/**************************
3) GET | ticket by :id  ***/
router.get('/tickets/:id', (req, res) => {
  Ticket.findById({_id: mongoose.Types.ObjectId("5de533cde4540457cac6c43b")})
  .then(ticket => {
    console.log(ticket)
    res.status(200).json(ticket)
  })
  .catch(err => {
    res.status(401).json(err)
  })
})




module.exports = router;
