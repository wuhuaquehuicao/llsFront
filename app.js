const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const path = require("path");
const routes = require("./routes");
const cookieParser = require("cookie-parser");
const NODE_ENV = process.env.NODE_ENV;
const { PORT } = require(path.resolve("./config", NODE_ENV));
const helmet = require("helmet");
const package = require("./package.json");
const I18n = require("./middleware/I18n");
const ExpSession = require("./middleware/ExpSession");
const viewsPath = path.join(__dirname, "views");
const staticPath = path.join(__dirname, "public");

app.version = package.version;

app.set("views", viewsPath);
app.set("view engine", "ejs");

app.use(helmet());
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(staticPath));
app.use(I18n.init);
app.use(ExpSession);
app.use(routes);

app.listen(PORT, console.log(`Listening on port: ${PORT}, NODE_ENV: ${NODE_ENV}!  :)`));
