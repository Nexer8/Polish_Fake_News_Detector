const express = require("express");
const router = require("express-promise-router")();

router.use("/client", require("./client"));
router.use("/editor", require("./editor"));

module.exports = router;
