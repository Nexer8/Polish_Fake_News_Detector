const mongoose = require("mongoose");
var mailgun = require("mailgun-js")({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.DOMAIN,
});

const Editor = require("../models/Editor");
const Report = require("../models/Report");
const Result = require("../models/Result");

const { buildMailHtml } = require("../helpers/mailingHelpers");

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
    const { reportId, comment, verdict } = req.value.body;

    const report = await Report.findById(reportId).populate("result");

    const html = await buildMailHtml(
      reportId,
      report.result.statement,
      verdict,
      comment
    );

    const data = {
      from: `Fake News Detection <fake-news-detection@${process.env.DOMAIN}>`,
      to: report.reporter,
      subject: `Odpowiedź na zgłoszenie #${reportId}!`,
      html,
    };

    var success = false;

    await mailgun
      .messages()
      .send(data)
      .then((res) => {
        report.resolved = true;
        report.save();

        success = true;
      })
      .catch((err) => {
        console.log("Error while sending the email!", err);
      });

    if (success) {
      res.status(200).json({ message: "E-mail sent" });
    } else {
      res.status(500).json({ error: { message: "Sending the e-mail failed" } });
    }
  },

  getReport: async (req, res, next) => {
    const { reportId } = req.value.params;

    const report = await Report.findById(reportId).populate("result");

    if (!report) {
      res.status(404).json({ error: { message: "Report not found" } });
    } else {
      res.status(200).json(report);
    }
  },

  getReports: async (req, res, next) => {
    const reports = await Report.find({}).populate("result");

    res.status(200).json(reports);
  },
};
