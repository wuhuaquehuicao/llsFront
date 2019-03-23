const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const LocationlistController = require("../controller/LocationlistController");
const LocaitonlistManager = require("../api/LocationListManager");
/**
 * Controller
 */
router.use("/api/location", LocationlistController);

/**
 * page routes
 */
router.use("/location", pageRouter);
//===list apge===
pageRouter.get("", (req, res) => {
  res.render("location", {
    page: "list"
  });
});
//===add apge===
pageRouter.get("/add", (req, res) => {
  res.render("location", {
    page: "add"
  });
});
//===toedit===
pageRouter.get("/toedit", (req, res) => {
  LocaitonlistManager.findById(req.query.id)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.render("location", {
          page: "edit",
          data: data.result
        });
      } else {
        res.status(500).json({ success: false, msg: "Query error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Catch error" });
    });
});

module.exports = router;
