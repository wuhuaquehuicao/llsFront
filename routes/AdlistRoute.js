const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const AdlistController = require("../controller/AdlistController");

/**
 * Controller
 */
router.use("/api/adlist", AdlistController);

/**
 * page routes
 */
router.use("/adlist", pageRouter);
//===list apge===
pageRouter.get("", (req, res) => {
  res.render("adlist", {
    page: "list"
  });
});
//===add apge===
pageRouter.get("/add", (req, res) => {
  res.render("adlist", {
    page: "add"
  });
});
//===toedit===
pageRouter.get("/toedit", (req, res) => {
  res.render("adlist", {
    page: "edit"
  });
});

module.exports = router;
