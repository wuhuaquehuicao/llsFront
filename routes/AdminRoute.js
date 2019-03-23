const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const AdminController = require("../controller/AdminController");
const AdminManager = require("../api/AdminManager");
/**
 * Controller
 */
router.use("/api/admin", AdminController);

/**
 * page routes
 */
router.use("/admin", pageRouter);

//===list apge===
pageRouter.get("", (req, res) => {
  res.render("admin", {
    page: "list"
  });
});

//===add apge===
pageRouter.get("/add", (req, res) => {
    res.render("admin", {
      page: "add"
    });
});

//===toedit===
pageRouter.get("/toedit", (req, res) => {
  res.render("admin", {
    page: "edit",
    data: req.query
  });
});

module.exports = router;