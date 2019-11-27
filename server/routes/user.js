const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Ticket = require("../models/Ticket");
var ObjectId = require("mongodb").ObjectID;
const sendEmail = require('../config/sendEmail')

/************************************
1) POST crea-ticket | crea ticket  ***/
router.use("/crea-ticket", (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.status(401).json({message: "You don't have the credentials"});
    }
  });
  
router.post("/crea-ticket",  (req, res) => {
    /* new ticket */
    let today = new Date();
    minutes = today.getMinutes().toString().padStart(2, '0') // adding a 0 if less then 10
    let date = today.getDate() + '-'+(today.getMonth()+1) + "-" + today.getFullYear()+ ' ' + " | " +  today.getHours() + ":" + minutes ;
  
    // if(req.file == undefined){
    //   req.file = ""
    // }
    let myTicket = new Ticket({
    //   author: req.session.currentUser.username,
      title: req.body.title,
      message: req.body.message,
      user: ObjectId(req.session.currentUser._id),
      active: true,
      service: req.body.service,
      time: date,
    //   picture: {
    //     name: req.body.name,
    //     path: req.file.url,
    //     originalName: req.file.originalname
    //   }
    });

      const ticket =  myTicket.save() // save ticket 
      const user = User.updateOne( // add the new ticket to the customer's tickets array 
        { _id: req.body.user },
        { $push: { tickets: ObjectId(myTicket._id) } },
        { new: true }
      )
      Promise.all([ticket, user])
      .then(() => {
        // sendEmail(
        //   process.env.NODEMAILER_EMAIL,
        //   process.env.ADMIN_EMAIL,
        //   `Nuovo ticket| ${req.body.title}`,
        //   req.body.message + '<br><br><a href="http://support.vanillamarketing.it/admin">Ticket</a>'
        // );
        res.status(200).json({myTicket});
      })
      .catch(err => {
        res.status(401).json({err});
      });
  });
  


module.exports = router;