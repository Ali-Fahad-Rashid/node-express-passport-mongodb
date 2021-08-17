const LocalStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt')
const  User  = require('../models/user');


module.exports = function (passport) {


passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) { return done(null, false,{ message: 'No user found' }); }
/*         if (user.password != password) {
            return done(null, false);
        }
                return done(null, user); */

                bcrypt.compare(password, user.password, function (err, isMatch) {
                  if (err) throw err;
                  if (isMatch) {
                    return done(null, user);
                  } else {
                    return done(null, false, { message: 'Wrong password' });
                  }
                });


      });
    }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
   
  passport.deserializeUser(function(id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  })

}