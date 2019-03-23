const express = require("express");
const AdlistController = express.Router();
const ADListManager = require("../api/ADListManager");
const ADList = require("../entity/ADList");

//===findAll===
AdlistController.get("", (req, res) => {
  ADListManager.findAll()
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
AdlistController.get("/page", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    order: req.query.order,
    sort: req.query.sort
  };

  ADListManager.findByPage(params)
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

//===find by filter===
AdlistController.get("/filter", (req, res) => {
  let filter = req.query.filter;
  if (filter) {
    filter = JSON.parse(filter);
  }
  let key = req.query.key;

  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    filter: filter,
    key: key
  };
  ADListManager.findByFilter(params)
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

//===find by id===
AdlistController.get("/:id", (req, res) => {
  ADListManager.findById(req.params.id)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json(data.result);
      } else {
        res.status(500).json({ success: false, msg: "Query error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false });
    });
});

//===add===
AdlistController.post("/add", (req, res) => {
  let adList = new ADList(req.body);
  let rs = adList.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }
  ADListManager.create(adList)
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
AdlistController.post("/edit", function(req, res) {
  let adList = new ADList(req.body);
  let rs = adList.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }
  ADListManager.update(req.body.id, adList)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Update failure" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===remove file===
AdlistController.delete("/:adlist_id/ads/:ad_id", (req, res) => {
  ADListManager.remove(req.params.adlist_id, req.params.ad_id)
    .then(res => res.data)
    .then(data => {
      res.status(200).json({ success: true });
    })
    .catch(e => {
      res.status(500).json({ success: false, msg: "error" });
    });
});

//===Delete AD List===
AdlistController.post("/remove", function(req, res) {
  ADListManager.removeAdList(req.body.id)
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Remove failure" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===add ad===
AdlistController.post("/:adlist_id/ads/", (req, res) => {
  ADListManager.addAD(req.params.adlist_id, req.body)
  .then(res=>res.data)
  .then(data =>{
    res.status(200).json({ success: true });
  })
  .catch(e => {
    res.status(500).json({ success: false, msg: "error" });
  });
});

module.exports = AdlistController;
