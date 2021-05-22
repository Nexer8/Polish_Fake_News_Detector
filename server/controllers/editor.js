const mongoose = require("mongoose");
const Editor = require("../models/Editor");
const Report = require("../models/Report");
const Result = require("../models/Result");

module.exports = {
  register: async (req, res, next) => {
    const { email, password } = req.value.body;

    const editor = new Editor();
    editor.email = email;
    editor.setPassword(password);
    await editor.save();

    const token = editor.generateJWT();
    res.cookie("fn_access_token", token, {
      httpOnly: true,
    });

    res.status(200).json({ success: true });
  },

  login: async (req, res, next) => {
    const token = req.user.generateJWT();
    res.cookie("fn_access_token", token, {
      httpOnly: true,
    });

    res.status(200).json({ success: true });
  },

  review: async (req, res, next) => {
    res.status(200);
  },

  getReport: async (req, res, next) => {
    const { reportId } = req.value.params;

    const report = await Report.findById(reportId).populate("result");

    if (!report) {
      res.status(404).json({ message: "Report not found" });
    } else {
      res.status(200).json(report);
    }
  },

  getReports: async (req, res, next) => {
    const reports = await Report.find({}).populate("result");

    res.status(200).json(reports);
  },
};
