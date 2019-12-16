require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session    = require("express-session");
const MongoStore = require('connect-mongo')(session);
const flash      = require("connect-flash");
const cors = require("cors");

  
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

  
const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


app.use(cors({
    origin: [process.env.CLIENT_URL],
    credentials: true 
}));

app.use(express.static(path.join(__dirname, "build")));

// app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
  

// Enable authentication using session + passport
app.use(session({
  secret: process.env.SESSIONSECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false },
  store: new MongoStore( { mongooseConnection: mongoose.connection })
}))
app.use(flash());
require('./passport')(app);





const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);
      
const adminRoutes = require('./routes/admin');
app.use('/admin', adminRoutes);

const userRoutes = require('./routes/user');
app.use('/', userRoutes);

const sharedRoutes = require('./routes/shared');
app.use('/', sharedRoutes);


app.use((req, res, next) => {
  // If no routes match, send them the React HTML.
  res.sendFile(__dirname + "/public/index.html");
});

module.exports = app;
