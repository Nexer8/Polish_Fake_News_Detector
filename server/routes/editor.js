const express = require("express");
const router = require("express-promise-router")();
const passport = require("passport");
const passportConfig = require("../config/passport");

const passportJWT = passport.authenticate("jwt", { session: false });
const passportLocal = passport.authenticate("local", { session: false });

const EditorController = require("../controllers/editor");
const {
  validateBody,
  validatePathParam,
  schemas,
} = require("../helpers/routeHelpers");

router.route("/login").post(
  validateBody(schemas.loginBodySchema),
  // passportLocal,
  EditorController.login
);

router.route("/review").post(
  validateBody(schemas.reviewBodySchema),
  // passportJWT,
  EditorController.review
);

router.route("/report/:resultId").get(
  validatePathParam(schemas.idSchema, "resultId"),
  // passportJWT,
  EditorController.getReport
);

// TODO: validateQueryParam
router.route("/reports").get(
  // passportJWT,
  EditorController.getReports
);

module.exports = router;
