const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({});

const Result = mongoose.model("Result", resultSchema);

module.exports = Result;
