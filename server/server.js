const dotenv = require("dotenv");
process.on("uncaughtException", (err) => {
  console.log(err.message, err.name);
  console.error(err.stack);
  console.info("Unhandled Exception; Shutting down the server");
  process.exit(1);
});
dotenv.config({ path: "../.env" });
const app = require("./app");

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message, err.stack);
  console.log("Unhandled rejection");
  server.close(() => {
    process.exit(1);
  });
})