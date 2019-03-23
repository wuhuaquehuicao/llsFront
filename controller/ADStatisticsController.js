const express = require("express");
const ADStatisticsController = express.Router();
const ADStatisticsManager = require("../api/ADStatisticsManager");

//===findAll===
ADStatisticsController.get("", (req, res) => {
    ADStatisticsManager.findAll()
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json(data.result.items);
      } else {
        res.status(500).json({ success: false, msg: "Query error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Catch error" });
    });
});

//===find by page===
ADStatisticsController.get("/page", (req, res) => {
  var fromdate = new Date(req.query.fromdate);
  var fromtime = fromdate.getTime();

  var todate = new Date(req.query.todate);
  var totime = todate.getTime() + 24*60*60*1000;

  let params = {
    from: fromtime,
    to: totime,
    limit: req.query.limit,
    offset: req.query.offset,
    order: req.query.order,
    sort: req.query.sort

  };

  ADStatisticsManager.findByPage(params)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        let resData = {
          rows: data.result.items,
          total: data.result.totalcount
        };
        res.status(200).json(resData);
      } else {
        res.status(500).json({ success: false, msg: "Query error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Catch error" });
    });
});

module.exports = ADStatisticsController;
