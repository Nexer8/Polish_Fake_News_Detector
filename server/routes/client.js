const express = require("express");
const router = require("express-promise-router")();

const ClientController = require("../controllers/client");
const {
  validateBody,
  validatePathParam,
  schemas,
} = require("../helpers/routeHelpers");

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
      validatePathParam(schemas.idParamSchema, "resultId"),
    ],
    ClientController.report
  );

router
  .route("/result/:resultId")
  .get(
    validatePathParam(schemas.idParamSchema, "resultId"),
    ClientController.getResult
  );

module.exports = router;
