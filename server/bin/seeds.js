// Seeds file that remove all users and create 2 new users

// To execute this seed, run from the root of the project
// $ node bin/seeds.js

const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const bcryptSalt = 10;

mongoose
  .connect('mongodb://heroku_j3rt2qcp:8cor4rjudrd8efoqo703e5sc90@ds163701.mlab.com:63701/heroku_j3rt2qcp', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let users = [
  {
    username: "test",
    password: bcrypt.hashSync("test", bcrypt.genSaltSync(bcryptSalt)),
    email: "carucciguido@gmail.com"
  },
  {
    username: "admin",
    password: bcrypt.hashSync("admin", bcrypt.genSaltSync(bcryptSalt)),
    serviceAdmin: ['Web Development'],
     email: "carucciguido@gmail.com",
     admin: true

  }
]

User.deleteMany()
.then(() => {
  return User.create(users)
})
.then(usersCreated => {
  console.log(`${usersCreated.length} users created with the following id:`);
  console.log(usersCreated.map(u => u._id));
})
.then(() => {
  // Close properly the connection to Mongoose
  mongoose.disconnect()
})
.catch(err => {
  mongoose.disconnect()
  throw err
})