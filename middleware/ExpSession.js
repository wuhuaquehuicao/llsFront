var session = require("express-session");

module.exports = session({
  secret: "SADBJASNDBSAKUXSANJ",
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 5
  }
});
