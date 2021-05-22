const Joi = require("@hapi/joi");

module.exports = {
  validatePathParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({
        param: req["params"][name],
      });

      if (result.error) {
        return res.status(400).json({ param: name, error: result.error });
      } else {
        if (!req.value) req.value = {};
        if (!req.value["params"]) req.value["params"] = {};

        req.value["params"][name] = result.value.param;
        next();
      }
    };
  },

  validateQueryParam: (schema, name) => {
    return (req, res, next) => {
      const result = schema.validate({
        param: req["query"][name],
      });

      if (result.error) {
        return res.status(400).json({ param: name, error: result.error });
      } else {
        if (!req.value) req.value = {};
        if (!req.value["query"]) req.value["query"] = {};

        req.value["query"][name] = result.value.param;
        next();
      }
    };
  },

  validateBody: (schema) => {
    return (req, res, next) => {
      const result = schema.validate(req.body);

      if (result.error) {
        return res.status(400).json(result.error);
      } else {
        if (!req.value) req.value = {};
        if (!req.value["body"]) req.value["body"] = {};

        req.value["body"] = result.value;
        next();
      }
    };
  },

  schemas: {
    // TODO: adjust schemas based on routes
    idParamSchema: Joi.object({
      param: Joi.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
    }),
    editorBodySchema: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }),
    reviewBodySchema: {},
    verifyStatementBodySchema: {},
    reportBodySchema: {},
  },
};
