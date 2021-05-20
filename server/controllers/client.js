const mongoose = require("mongoose");

module.exports = {
  getResult: async (req, res, next) => {
    const { resultId } = req.value.params;

    res.status(200);
  },

  verify: async (req, res, next) => {
    res.status(200);
  },

  report: async (req, res, next) => {
    const { resultId } = req.value.params;

    res.status(200);
  },
};
