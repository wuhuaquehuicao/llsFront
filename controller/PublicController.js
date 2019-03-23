const express = require("express");
const PublicController = express.Router();
const UserManager = require("../api/UserManager");
const User = require("../entity/User");

//===set language===
PublicController.get("/setlang", (req, res) => {
  let lan = req.query.lan;
  if (lan == "en") {
    res.cookie("lang", "en");
  } else if (lan == "zh") {
    res.cookie("lang", "zh");
  }
  res.status(200).json({ success: true });
});
//===login===
PublicController.post("/login", (req, res) => {
  let user = new User(req.body);
  let rs = user.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }
  UserManager.login(user)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        req.session.user = data.result;
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, msg: "Login failure" });
        return;
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Something wrong" });
    });
});
//===logout===
PublicController.get("/logout", (req, res) => {
  req.session.user = null;
  res.redirect("login");
});

module.exports = PublicController;
