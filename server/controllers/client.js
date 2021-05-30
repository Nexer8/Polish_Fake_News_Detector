const mongoose = require("mongoose");
const axios = require("axios");
const Result = require("../models/Result");
const Report = require("../models/Report");

const { verifyCaptcha } = require("../helpers/captchaHelpers");

module.exports = {
  getResult: async (req, res, next) => {
    const { resultId } = req.value.params;
    const result = await Result.findById(resultId);

    if (!result) {
      res.status(404).json({ error: { message: "Result not found" } });
    } else {
      res.status(200).json(result);
    }
  },

  verify: async (req, res, next) => {
    const { statement, captchaToken } = req.value.body;

    const isCaptchaValid = await verifyCaptcha(captchaToken);

    if (!isCaptchaValid) {
      res.status(500).json({ error: { message: "It seems you're a robot!" } });
      return;
    }

    let result = await Result.findOne({ statement });

    if (!result) {
      const response = await axios.post("http://127.0.0.1:8000/classify", {
        statement: statement,
      });

      const fakeProbability = response.data.fake;
      const trueProbability = response.data.true;

      const verdict = trueProbability > fakeProbability ? "Prawda" : "Fałsz";

      let probability =
        trueProbability > fakeProbability ? trueProbability : fakeProbability;

      probability = Math.round(probability * 100);

      result = new Result({
        statement,
        verdict,
        probability,
      });

      await result.save();
    }

    res.status(200).json(result);
  },

  report: async (req, res, next) => {
    const { resultId } = req.value.params;
    const { category, comment, date, politician, reporter, captchaToken } =
      req.value.body;

    const isCaptchaValid = await verifyCaptcha(captchaToken);

    if (!isCaptchaValid) {
      res.status(500).json({ error: { message: "It seems you're a robot!" } });
      return;
    }

    const result = await Result.findById(resultId);

    const report = new Report({
      result: result,
      category: category ? category : null,
      comment: comment,
      date: date ? Date.parse(date) : null,
      politician: politician ? politician : null,
      reporter: reporter,
      resolved: false,
    });
    await report.save();
    res.status(200).json(report);
  },
};
