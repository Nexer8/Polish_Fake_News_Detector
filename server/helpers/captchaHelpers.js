const axios = require("axios");

module.exports = {
  verifyCaptcha: async (token) => {
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`;

    const response = await axios.post(url);

    return response.data.success;
  },
};
