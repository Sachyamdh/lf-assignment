const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");
const css = fs.readFileSync(
  path.join(__dirname, "../../templates/emails/auth/email-styles.css"),
  "utf8"
);
handlebars.registerPartial("auth/email-styles", css);

function generateTemplate(templateName, data) {
  const filePath = path.join(
    __dirname,
    "../..",
    "templates",
    "emails",
    "auth",
    `${templateName}.hbs`
  );
  const source = fs.readFileSync(filePath, "utf8");
  const template = handlebars.compile(source);
  return template(data);
}

module.exports = generateTemplate;
