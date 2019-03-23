const express = require("express");
const router = express.Router();
const pageRouter = express.Router();
const ADStatisticsController = require("../controller/ADStatisticsController");

/**
 * Controller
 */
router.use("/api/adstatistics", ADStatisticsController);

/**
 * page routes
 */
router.use("/adstatistics", pageRouter);
//===list apge===
pageRouter.get("", (req, res) => {
  res.render("adstatistics", {
    page: "list"
  });
});

module.exports = router;
