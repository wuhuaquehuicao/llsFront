var path = require("path");
var localesPath = path.resolve("public/locales");
var i18n = require("i18n");

i18n.configure({
  locales: ["en", "zh"],
  cookie: "lang",
  directory: localesPath,
  autoReload: true
});

module.exports = i18n;
