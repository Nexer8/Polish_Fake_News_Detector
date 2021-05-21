const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;

const Editor = require("../models/Editor");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (email, password, done) => {
      try {
        const editor = await Editor.findOne({ email });
        if (!editor) {
          return done(null, false, { message: "Invalid credentials." });
        }
        const correctPassword = editor.verifyPassword(password);
        if (!correctPassword) {
          return done(null, false, { message: "Invalid credentials." });
        }
        done(null, editor);
      } catch (error) {
        done(error, false);
      }
    }
  )
);

const tokenHandler = (req) => {
  if (!req || !req.cookies) {
    return null;
  }

  return req.cookies["fn_access_token"];
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
        const editor = await Editor.findById(payload.editorId);
        if (!editor) {
          return done(null, false);
        }
        req.editor = editor;
        done(null, editor);
      } catch (error) {
        done(error, false);
      }
    }
  )
);
