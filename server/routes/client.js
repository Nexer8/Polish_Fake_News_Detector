const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../config/passport");

const passportJWT = passport.authenticate("jwt", { session: false });

const ClientController = require("../controllers/client");
const {
  validateBody,
  validatePathParam,
  schemas,
} = require("../helpers/routeHelpers");

const passportLocal = passport.authenticate("local", { session: false });

router
  .route("/verify")
  .post(
    validateBody(schemas.verifyStatementBodySchema),
    ClientController.verify
  );

router
  .route("/report/:resultId")
  .post(
    [
      validateBody(schemas.reportBodySchema),
      validatePathParam(schemas.idSchema, "resultId"),
    ],
    ClientController.report
  );

router
  .route("/result/:resultId")
  .get(
    validatePathParam(schemas.idSchema, "resultId"),
    ClientController.getResult
  );

module.exports = router;
