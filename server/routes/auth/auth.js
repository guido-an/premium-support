const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

/// POST SIGNUP
router.post('/signup', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === '' || password === '') {
    res.status(400).json({message: 'Indicate username and password'});
    return;
  }

  User.findOne({username}, 'username', (err, user) => {
    if (user !== null) {
      res.status(400).json({message: 'The username already exists'});
      return;
    }

    const salt = bcrypt.genSaltSync(bcryptSalt);
    const hashPass = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      password: hashPass,
    });

    newUser
      .save()
      .then(user => {
        res.status(200).json(newUser);
      })
      .catch(err => {
        res.status(400).json({message: 'Something went wrong'});
      });
  });
});

/// POST LOGIN

router.post('/login', (req, res) => {
  let currentUser = false
  User.findOne({username: req.body.username})
    .then(user => {
      if (!user) {
        res.status(401).json({
          errorMessage: "The username doesn't exist.",
        });
        return;
      }
      currentUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(passwordCorrect => {
      if (passwordCorrect) {
        req.session.currentUser = currentUser;
        // currentUser = req.session.currentUser;
        console.log(req.session,"req session")
        res.status(200).json({message: 'Loggedin succesfully', currentUser});
      } else {
        res.status(401).send({
          errorMessage: 'Incorrect password',
        });
      }
    });
});


// router.post('/login', (req, res) => {
//   let currentUser;
//   User.findOne({username: req.body.username})
//     .then(user => {
//       if (!user) {
//         res.status(401).json({
//           errorMessage: "The username doesn't exist.",
//         });
//         return;
//       }
//       currentUser = user;
//       return bcrypt.compare(req.body.password, user.password);
//     })
//     .then(passwordCorrect => {
//       if (passwordCorrect) {
//         req.session.currentUser = currentUser;
      
//         res.status(200).json({message: 'Loggedin succesfully', currentUser});
//       } else {
//         res.status(401).json({
//           errorMessage: 'Incorrect password',
//         });
//       }
//     });
// });

///LOGOUT
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    res.status(200).json({message: 'Logged out'});
  });
});


/// LOGGEDIN
router.get('/currentUser', (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json({currentUser: req.session.currentUser});
    return;
  } else {
    res.json({message: 'Unauthorized'});
    return;
  }
});





module.exports = router;
