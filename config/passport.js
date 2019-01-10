const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../models");
const keys = require("./keys");
var passport = require('passport');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// module.exports = passport => {
//   console.log("in passport.js");
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      db.Users.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
// };

exports.isAuthenticated = passport.authenticate('jwt', { session : false });