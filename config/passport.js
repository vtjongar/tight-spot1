// removed local - was "passport-local"
const LocalStrategy = require("passport-local").Strategy;
const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");

module.exports = function(passport) {
  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use(
    "local-signup",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
        User.findOne({ "email": email })
          .then(user => {
            if (user) {
              return callback(
                null,
                false,
                req.flash("signupMessage", "That email is taken")
              );
            } else {
              let newUser = new User();
              newUser.email = email;
              newUser.password = newUser.encrypt(password);

              newUser.save(err => {
                if (err) throw err;
                return callback(null, newUser);
              });
            }
          })
          .catch(err => console.log(err));
      }
    )
  );

  passport.use(
    "local-login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      },
      function(req, email, password, callback) {
        User.findOne({ "email": email }, function(err, user) {
          if (err) return callback(err);

          if (!user) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "User not found")
            );
          }
          if (!user.validPassword(password)) {
            return callback(
              null,
              false,
              req.flash("loginMessage", "Incorrect password...")
            );
          }
          return callback(null, user);
        });
      }
    )
  );
};