
const axios = require("axios");

module.exports = (req, res, next) => {
  if (req.session.user) {
    axios.defaults.headers.common['X-Access-Token'] = req.session.user.token;
    return next();
  }
  res.redirect("/login");
};
