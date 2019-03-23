const express = require("express");
const LocationlistController = express.Router();
const LocaitonlistManager = require("../api/LocationListManager");
const Location = require("../entity/Location");

//===findAll===
LocationlistController.get("", (req, res) => {
  LocaitonlistManager.findAll()
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===find by page===
LocationlistController.get("/page", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    order: req.query.order,
    sort: req.query.sort
  };
  LocaitonlistManager.findByPage(params)
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===find by key===
LocationlistController.get("/key", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    key: req.query.key
  };

  LocaitonlistManager.findByKey(params)
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

//===add===
LocationlistController.post("/add", (req, res) => {
  let location = new Location(req.body);
  let rs = location.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }
//  console.log(location);
  LocaitonlistManager.create(location)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Create error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===edit===
LocationlistController.put("/edit", function(req, res) {
  let location = new Location(req.body);
  let rs = location.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }
  
  LocaitonlistManager.update(req.body.id,location)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Edit error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===update===
LocationlistController.put("/changeLocationPassword", (req, res) => {
  var data = {"password": req.body.password};
  var locationid = req.body.id;
  LocaitonlistManager.changeLocationPassword(data, locationid)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(400).json({ success: false, msg: "Update failure" });
        return;
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Something wrong" });
    });
});

module.exports = LocationlistController;
