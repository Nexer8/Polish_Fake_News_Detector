const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../config/passport");

const EditorController = require("../controllers/editor");
const {
  validateBody,
  validatePathParam,
  schemas,
} = require("../helpers/routeHelpers");

const passportJWT = passport.authenticate("jwt", { session: false });
const passportLocal = passport.authenticate("local", { session: false });

router
  .route("/register")
  .post(validateBody(schemas.editorBodySchema), EditorController.register);

router
  .route("/login")
  .post(
    validateBody(schemas.editorBodySchema),
    passportLocal,
    EditorController.login
  );

router
  .route("/review")
  .post(
    validateBody(schemas.reviewBodySchema),
    passportJWT,
    EditorController.review
  );

router
  .route("/report/:reportId")
  .get(
    validatePathParam(schemas.idParamSchema, "reportId"),
    passportJWT,
    EditorController.getReport
  );

// TODO: validateQueryParam
router.route("/reports").get(passportJWT, EditorController.getReports);

module.exports = router;
