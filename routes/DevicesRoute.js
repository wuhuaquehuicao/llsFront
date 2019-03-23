const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const DevicesController = require("../controller/DevicesController");
const DevicesManager = require("../api/DevicesManager");

/**
 * Controller
 */
router.use("/api/devices", DevicesController);

/**
 * page routes
 */
router.use("/devices", pageRouter);
//===list apge===
pageRouter.get("", (req, res) => {
  res.render("devices", {
    page: "list"
  });
});

pageRouter.put("/update", (req, res) => {
  res.render("devices", {
    page: "list"
  });
});

//===toedit===
pageRouter.get("/toedit", (req, res) => {
  DevicesManager.findById(req.query.id)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.render("devices", {
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
