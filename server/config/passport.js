const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

const Editor = require("../models/Editor");

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      // const user = await User.findOne({ username });
      // if (!user) {
      //   return done(null, false, { message: "Invalid credentials." });
      // }
      // const correctPassword = user.verifyPassword(password);
      // if (!correctPassword) {
      //   return done(null, false, { message: "Invalid credentials." });
      // }
      // done(null, user);
    } catch (error) {
      done(error, false);
    }
  })
);

const tokenHandler = (req) => {
  if (!req || !req.cookies) {
    return null;
  }

  return req.cookies["fnc_access_token"];
};

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: tokenHandler,
      secretOrKey: process.env.JWT_SECRET,
      passReqToCallback: true,
    },
    async (req, payload, done) => {
      try {
        // const user = await User.findById(payload.userId);
        // if (!user) {
        //   return done(null, false);
        // }
        // req.user = user;
        // done(null, user);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
