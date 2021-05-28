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
  checkSession: async (req, res, next) => {
    if (req.editor) {
      res.status(200).json({ success: true });
    }
  },

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

  logout: async (req, res, next) => {
    res.clearCookie("fn_access_token");

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

    await mailgun.messages().send(data);

    report.resolved = true;
    report.save();

    res.status(200).json({ message: "E-mail sent" });
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
    const { category, dateFrom, dateTo, politician } = req.query;
    console.log(category, dateFrom, dateTo, politician);

    const reports = await Report.find({}).populate("result");

    let filteredReports = reports.filter((report) => !report.resolved);

    if (category) {
      filteredReports = filteredReports.filter((report) =>
        report.category.toUpperCase().includes(category.toUpperCase())
      );
    }

    if (dateFrom) {
      const filterDate = new Date(dateFrom);
      filterDate.setHours(0, 0, 0, 0);

      filteredReports = filteredReports.filter((report) => {
        if (!report.date) {
          return false;
        }

        const reportDate = new Date(report.date);
        reportDate.setHours(0, 0, 0, 0);

        return reportDate.getTime() >= filterDate.getTime();
      });
    }

    if (dateTo) {
      const filterDate = new Date(dateTo);
      filterDate.setHours(0, 0, 0, 0);

      filteredReports = filteredReports.filter((report) => {
        if (!report.date) {
          return false;
        }

        const reportDate = new Date(report.date);
        reportDate.setHours(0, 0, 0, 0);

        return reportDate.getTime() <= filterDate.getTime();
      });
    }

    if (politician) {
      filteredReports = filteredReports.filter((report) =>
        report.politician.toUpperCase().includes(politician.toUpperCase())
      );
    }

    res.status(200).json(filteredReports);
  },
};
