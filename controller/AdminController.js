const express = require("express");
const AdminController = express.Router();
const AdminManager = require("../api/AdminManager");

//===find users by page===
AdminController.get("/findUsersByPage", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    order: req.query.order,
    sort: req.query.sort
  };

  AdminManager.findUsersByPage(params)
  .then(res=> res.data)
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

//===find users by key===
AdminController.get("/findUsersByKey", (req, res) => {
  let params = {
    limit: req.query.limit,
    offset: req.query.offset,
    key: req.query.key,
    order: req.query.order,
    sort: req.query.sort
  };

  AdminManager.findUsersByKey(params)
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

//=== create user ===
AdminController.post("/create", (req, res) => {
    AdminManager.create(req.body, req.session.user.id)
    .then(res=> res.data)
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
})

//===reset password===
AdminController.get("/resetpassword", (req, res) => {
  AdminManager.resetPassword(req.query.id, req.session.user.id)
  .then(res=> res.data)
  .then(data => {
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        var errMsg = data.error.reason;
        res.status(500).json({ success: false, msg: errMsg ? errMsg:"Reset password error" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
})

AdminController.put("/changepassword", (req, res) => {
  var data = {
    old_password : req.body.oldpassword,
    password: req.body.newpassword
  }

  AdminManager.changePassword(req.session.user.id , data)
  .then(res=> res.data)
  .then(data => {
    console.log(data);
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        if(data.error.reason){
          res.status(500).json({ success: false, msg: data.error.reason });
        }
        else
        {
          res.status(500).json({ success: false, msg: "Change password error" });
        }
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

module.exports = AdminController;