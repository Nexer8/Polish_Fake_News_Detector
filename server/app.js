const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Database
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

// Basic security
app.use(helmet());
app.use(cookieParser());
app.use(cors());

// Middlewares
app.use(logger("dev"));
app.use(bodyParser.json());

// Routes
app.use("/api", require("./routes"));

// Catch 404 Errors and forward them to error handler
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get("env") === "development" ? err : {};
  const status = err.status || 500;

  // Respond to client
  res.status(status).json({
    error: {
      message: error.message,
    },
  });

  // Respond to ourselves
  console.error(err);
});

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is listening on port ${port}`));
