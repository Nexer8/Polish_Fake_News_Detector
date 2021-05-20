const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({
  result: {
    type: Schema.Types.ObjectId,
    ref: "Result",
    required: true,
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

resultSchema.virtual("url").get(function () {
  return "/editor/report/" + this._id;
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;
