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

    try {
      const result = await axios.post("http://127.0.0.1:8000/classify", {
        statement: statement,
      });
      const fakeProbability = result.data.fake;
      const trueProbability = result.data.true;
      const verdict = trueProbability > fakeProbability ? "true" : false;
      const probability =
        trueProbability > fakeProbability ? trueProbability : fakeProbability;

      const resultObject = await new Result({
        statement: statement,
        verdict: verdict,
        probability: probability,
      });
      await resultObject.save();

      res.status(200).json(resultObject);
    } catch (err) {
      res.status(500).json({ error: { message: "ML model eror occured" } });
    }

    res.status(200);
  },

  report: async (req, res, next) => {
    const { resultId } = req.value.params;
    const { category, comment, date, politician, reporter } = req.value.body;

    const result = await Result.findById(resultId);

    if (!result) {
      res.status(404).json({ error: { message: "Result not found" } });
    } else {
      try {
        const report = new Report({
          result: result,
          category: category,
          comment: comment,
          date: Date.parse(date),
          politician: politician,
          reporter: reporter,
          resolved: false,
        });
        await report.save();
        res.status(200).json(report);
      } catch (err) {
        res
          .status(500)
          .json({ error: { message: "Error occured when saving record" } });
      }
    }
  },
};
