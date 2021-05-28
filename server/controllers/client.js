const mongoose = require("mongoose");
const axios = require("axios");
const Result = require("../models/Result");
const Report = require("../models/Report");

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
    const { statement } = req.value.body;

    const result = await axios.post("http://127.0.0.1:8000/classify", {
      statement: statement,
    });
    const fakeProbability = result.data.fake;
    const trueProbability = result.data.true;
    const verdict = trueProbability > fakeProbability ? "Prawda" : "Fałsz";
    let probability =
      trueProbability > fakeProbability ? trueProbability : fakeProbability;
    probability = Math.round(probability * 100);

    const resultObject = new Result({
      statement,
      verdict,
      probability,
    });
    await resultObject.save();

    res.status(200).json(resultObject);
  },

  report: async (req, res, next) => {
    const { resultId } = req.value.params;
    const { category, comment, date, politician, reporter } = req.value.body;

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
