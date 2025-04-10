const express = require("express");
const appRouter = express.Router();
// const userRouter = require('./user.route');
const authRouter = require("./auth.routes");
const healthRouter = require("./health.routes");

appRouter.use("/auth", authRouter);
appRouter.use("/", healthRouter);

module.exports = appRouter;
