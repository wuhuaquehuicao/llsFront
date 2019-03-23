const express = require("express");
const DevicesController = express.Router();
const DevicesManager = require("../api/DevicesManager");
const Device = require("../entity/Device");

var objectArraySort = function (keyName) {
  return function (objectN, objectM) {
    var valueN = objectN[keyName]
    var valueM = objectM[keyName]
    if (valueN > valueM) return 1
    else if (valueN < valueM) return -1
    else return 0
  }
}

//===findAll===
DevicesController.get("", (req, res) => {
  DevicesManager.findAll()
    .then(res => res.data)
    .then(data => {
      if (data.status === "OK") {
        var devices = data.result.items.concat();
        devices.sort(objectArraySort('name'));
        res.status(200).json(devices);
      } else {
        res.status(500).json({ success: false, msg: "Query error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

//===update===
DevicesController.put("/update", (req, res) => {
  console.log(req.body);
  let device = new Device(req.body);

  //console.log("update devices: " + device.id + ",name: " + device.name + ",location_id: " + device.location_id);

  let rs = device.formVd();
  if (rs) {
    res.status(400).json({ success: false, msg: rs });
    return;
  }

  DevicesManager.update(device)
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

//===batch devices===
DevicesController.post("/batchdevices/:locationid", (req, res) => {
  DevicesManager.batchUpdateDevices(req.body, req.params.locationid)
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

//===find by page===
DevicesController.get("/searchByPage", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    order: req.query.order,
    sort: req.query.sort
  };
  DevicesManager.findByPage(params)
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
DevicesController.get("/searchByKey", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    key: req.query.key,
    locationKeys: req.query.locationKeys
  };
  console.log("findByKey, limit:" +params.limit +", offset:" + params.offset + ", key=" + params.key + ", locationKey=" + params.locationKeys);
  DevicesManager.findByKey(params)
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

module.exports = DevicesController;
