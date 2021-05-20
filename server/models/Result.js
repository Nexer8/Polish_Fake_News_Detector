const mongoose = require("mongoose");
const { Schema } = mongoose;

const CANNOT_BE_EMPTY_MSG = "can't be blank.";

const resultSchema = new Schema({
  statement: {
    type: String,
    required: [true, CANNOT_BE_EMPTY_MSG],
  },
  verdict: {
    type: String,
    required: [true, CANNOT_BE_EMPTY_MSG],
  },
  probability: {
    type: Number,
    required: [true, CANNOT_BE_EMPTY_MSG],
  },
});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
