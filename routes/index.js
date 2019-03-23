const express = require("express");
const router = express.Router();

const Auth = require("../middleware/Auth");

const PublicRoute = require("./PublicRoute");
const AdlistRoute = require("./AdlistRoute");
const ADRoute = require("./ADRoute");
const LocationListRoute = require("./LocationRoute")
const DevicesRoute = require("./DevicesRoute");
const ErrorRoute = require("./ErrorRoute");
const ADStatisticsRoute = require("./ADStatisticsRoute");
const AdminRoute = require("./AdminRoute");

router.use(PublicRoute);

router.use(Auth, AdlistRoute);
router.use(Auth, ADRoute);
router.use(Auth, LocationListRoute);
router.use(Auth, DevicesRoute);
router.use(Auth, ADStatisticsRoute);
router.use(Auth, AdminRoute);

// router.use(AdlistRoute);
// router.use(ADRoute);
// router.use(LocationListRoute);
// router.use(DevicesRoute);

router.use(ErrorRoute);

module.exports = router;
