const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const YAML = require("yamljs");
const morgan = require("morgan");
const swaggerUi = require("swagger-ui-express");
const swaggerOptions = require("./config/swagger");
const AppError = require("./middleware/errorHandler");

//routes import
const healthRoutes = require("./routes/health.routes");
const authRoutes = require("./routes/auth.routes");

// intializing express
const app = express();
const swaggerDocument = YAML.load("./config/swagger.yaml");

app.use(cors());
app.use(helmet());
process.env.NODE_ENV === "development" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//api routes
app.use("/api/v1", healthRoutes);
app.use("/api/v1/auth", authRoutes);

//swagger Ui setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// app.all("*", async (req, res) => {
//   console.log(req.originalUrl);
//   throw new AppError("Route Error", `Can't find the rpoute`, 404);
// });

// app.use(e);

module.exports = app;
