const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const PublicController = require("../controller/PublicController");

/**
 * Controller
 */
router.use("/api", PublicController);

/**
 * page routes
 */
router.use("/", pageRouter);
//===index===
pageRouter.get("/", (req, res) => {
  if (req.session.user) {
    if(req.session.user.role == "admin"){
      res.redirect("/admin");
    }else{
      if(req.session.user.original_pwd == 1){
        res.redirect("/profile");
      }
      else{
        res.redirect("/adlist");
      }
    }
  } else {
    res.render("login", { version: res.app.version });
  }
});
//===login page===
pageRouter.get("/login", (req, res) => {
  res.render("login", { version: res.app.version });
});

//===profile===
pageRouter.get("/profile", (req, res) => {
  var isAdmin = (req.session.user.role == "admin");
  res.render("profile", {
    page: "list",
    data:req.session.user,
    role: isAdmin
  });
});

module.exports = router;
