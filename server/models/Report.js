const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
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
  reporter: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, CANNOT_BE_EMPTY_MSG],
    match: [/\S+@\S+\.\S+/, "is invalid."],
    index: true,
  },
  comment: String,
  politician: String,
  date: Date,
  category: String,
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
