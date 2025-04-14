const express = require("express");
const appRouter = express.Router();
// const userRouter = require('./user.route');
const authRouter = require("./auth.routes");
const healthRouter = require("./health.routes");
const userRouter = require("./user.routes");
const app = require("../app");

appRouter.use("/auth", authRouter);
appRouter.use("/", healthRouter);
appRouter.use("/users", userRouter);

module.exports = appRouter;
