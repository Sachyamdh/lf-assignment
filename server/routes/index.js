const express = require("express");
const appRouter = express.Router();
// const userRouter = require('./user.route');
const authRouter = require("./auth.routes");
const healthRouter = require("./health.routes");
const userRouter = require("./user.routes");
const notesRouter = require("./notes.routes");
const folderRouter = require("./folder.routes");
const app = require("../app");
const { protect } = require("../middleware/authMiddleware");

appRouter.use("/auth", authRouter);
appRouter.use("/", healthRouter);
appRouter.use("/users", userRouter);
appRouter.use("/notes", protect, notesRouter);
appRouter.use("/folders", protect, folderRouter);

module.exports = appRouter;
