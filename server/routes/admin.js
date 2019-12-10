const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');



/********************************
1) GET tickets (private) | /admin ****/
router.use('/', (req, res, next) => {
  if (req.session.currentUser.admin) {
    next();
  } else {
    console.log(req.session.currentUser.username, " else req.session.currentUser.username")
    res.status(401).json({message: "You don't have the credentials"});
  }
});

router.get('/', (req, res, next) => {
  Ticket.find().sort({created_at: -1})
  .then(tickets => {
    console.log("tickets", tickets)
    res.status(200).json(tickets)
  })
  .catch(err => {
    console.log(err)
  })
});



module.exports = router;
