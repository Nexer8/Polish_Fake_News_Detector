const mongoose = require("mongoose");

module.exports = {
  login: async (req, res, next) => {
    // const token = req.user.generateJWT();
    // res.cookie("fn_access_token", token, {
    //   httpOnly: true,
    // });

    res.status(200).json({ success: true });
  },

  review: async (req, res, next) => {
    res.status(200);
  },

  getReport: async (req, res, next) => {
    const { resultId } = req.value.params;

    res.status(200);
  },

  getReports: async (req, res, next) => {
    res.status(200);
  },
};
