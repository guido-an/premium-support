const express = require('express');
const passport = require('passport');
const router = express.Router();

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

/********************************
1) GET tickets (private) | /admin *********/
router.use('/', (req, res, next) => {
  if (req.session.currentUser.username === process.env.admin) {
    next();
  } else {
    res.status(401).json({message: "You don't have the credentials"});
  }
});

router.get('/', (req, res, next) => {
  res.status(200).json({tickets: 'tickets coming'});
});

module.exports = router;
