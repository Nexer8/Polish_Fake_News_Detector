const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const { Schema } = mongoose;

const editorSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "can't be blank."],
    match: [/\S+@\S+\.\S+/, "is invalid."],
    index: true,
  },
  hashedPassword: String,
  salt: String,
});

editorSchema.plugin(uniqueValidator, { message: "already exists." });

editorSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hashedPassword = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

editorSchema.methods.verifyPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");

  return this.hashedPassword === hash;
};

editorSchema.methods.generateJWT = function () {
  return jwt.sign(
    {
      exp: new Date().setDate(new Date().getDate() + 1),
      iat: new Date().getTime(),
      editorId: this._id,
    },
    process.env.JWT_SECRET
  );
};

editorSchema.methods.parse = function () {
  return {
    email: this.email,
  };
};

const Editor = mongoose.model("Editor", editorSchema);

module.exports = Editor;
