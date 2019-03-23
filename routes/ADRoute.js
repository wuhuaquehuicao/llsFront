const express = require("express");
const router = express.Router();
const ADController = require("../controller/ADController");

/**
 * Controller
 */
router.use("/api/ad", ADController);

module.exports = router;
