



const express = require('express')
const userrouter = express.Router()
const  User  = require('../models/user');
const passport = require('passport');
const bcrypt = require('bcrypt')





userrouter.post('/login', 
passport.authenticate('local', { failureRedirect: '/login', failureFlash: true
}),
function(req, res) {
  res.redirect('/');
});


userrouter.get('/signup', (req, res) => {
  res.render('./users/signup');
});

userrouter.get('/login', (req, res) => {
  res.render('./users/signin');
});

userrouter.post('/signup', async (req, res) => {
    User.findOne({ username: req.body.username }).then( async (user) =>{
      if (user) { 
        req.flash('error', 'username exist');
            res.redirect('/signup');
            }

            else if(req.body.password!=req.body.confirm){

              req.flash('error', 'password are not the same');
              res.redirect('/signup');
            }

    else {
      const salt = await bcrypt.genSalt(10);
            const user1 = User({
            email: req.body.email,
            username: req.body.username,
            role:'user',
            password: await bcrypt.hash(req.body.password, salt)
          });
          user1.save();

          
          req.login(user1, function(err) {
            if (err) {
              console.log(err);
            }
            return res.redirect('/');
          });
        
        }
    })

});




userrouter.get('/logout', async (req, res) => {
  req.logout();
  res.redirect('/login');
});





module.exports = userrouter