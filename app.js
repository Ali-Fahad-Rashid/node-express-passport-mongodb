const express = require('express')
const mongoose = require('mongoose')
const app = express()
require('dotenv').config()
mongoose.connect(process.env.DB,{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>
app.listen(3100)).catch(err=>console.log(err))
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(require('body-parser').urlencoded({ extended: true }));
const passport = require('passport')
require('./routes/passport')(passport)

const flash = require('express-flash')
app.use(flash())

app.use(require('cookie-parser')());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());



  app.get('*', function (req, res, next) {
    res.locals.user = req.user || null;
    next();
  });

  const userrouter = require('./routes/usersRouter')
  app.use('/',userrouter)


  const router = require('./routes/PostRouter')
  app.use('/',router)