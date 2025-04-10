const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const YAML = require("yamljs");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const AppError = require("./middleware/AppError");
const dbConnect = require("./config/db");

//routes import
const appRouter = require("./routes/index");
dbConnect;

const errorController = require("./controller/error.controller");

// intializing express
const app = express();
const swaggerDocument = YAML.load("./config/swagger.yaml");

app.use(cors());
app.use(helmet());
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//swagger Ui setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api", appRouter);

// app.all("*", async (req, res) => {
//   console.log(req.originalUrl);
//   throw new AppError("Route Error", `Can't find the rpoute`, 404);
// });

// app.use(errorController);

module.exports = app;
