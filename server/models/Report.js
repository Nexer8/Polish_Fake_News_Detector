const mongoose = require("mongoose");
const { Schema } = mongoose;

const reportSchema = new Schema({});

const Report = mongoose.model("Report", reportsSchema);

module.exports = Report;
