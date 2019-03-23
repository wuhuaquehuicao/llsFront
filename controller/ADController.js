const express = require("express");
const ADController = express.Router();
const ADManager = require("../api/ADManager");
const { imageUpload, videoUpload } = require("../helper/UploadHelper");
const S3Upload = require("../helper/S3Upload");
const { deleteFile } = require("../helper/FileHelper");

const path = require("path");
const NODE_ENV = process.env.NODE_ENV;
const { S3BUCKET, CLOUDFRONTPATH } = require(path.resolve(
  "./config",
  NODE_ENV
));

const md5 = require("md5");

//===image upload===
ADController.post("/image", imageUpload.single("image"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, msg: "File not found." });
    return;
  }
  let filename = req.file.filename,
    adlistId = req.body.adlist_id,
    path = req.file.path,
    label = req.body.label,
    filemd5 = md5(req.file)+filename.substr(filename.lastIndexOf('.'));

  let bean = {
    ads: [
      {
        name: filemd5,
        path: `${CLOUDFRONTPATH}/${adlistId}/${filemd5}`,
        media_type: "image",
        label: label //upload the label info to server
      }
    ]
  };

  Promise.all([
    S3Upload(path, filemd5, `${S3BUCKET}/${adlistId}`),
    ADManager.create(adlistId, bean)
  ])
    .then(res => res[1].data)
    .then(data => {
      deleteFile(path);
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Update failure" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Upload error" });
    });
});
//===video upload===
ADController.post("/video", videoUpload.single("video"), (req, res) => {
  if (!req.file) {
    res.status(400).json({ success: false, msg: "File not found." });
    return;
  }
  let filename = req.file.filename,
    adlistId = req.body.adlist_id,
    path = req.file.path,
    label = req.body.label,
    filemd5 = md5(req.file)+filename.substr(filename.lastIndexOf('.'));

  let bean = {
    ads: [
      {
        name: filemd5,
        path: `${CLOUDFRONTPATH}/${adlistId}/${filemd5}`,
        media_type: "video",
        label: label //upload the label info to server
      }
    ]
  };
  Promise.all([
    S3Upload(path, filemd5, `${S3BUCKET}/${adlistId}`),
    ADManager.create(adlistId, bean)
  ])
    .then(res => res[1].data)
    .then(data => {
      deleteFile(path);
      if (data.status === "OK") {
        res.status(200).json({ success: true });
      } else {
        res.status(500).json({ success: false, msg: "Update failure" });
      }
    })
    .catch(e => {
      console.log(e);
      res.status(500).json({ success: false, msg: "Upload error" });
    });
});

ADController.get("/image/:searchkey", (req, res) => {
  ADManager.findImageAds(req.params)
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

ADController.get("/video/:searchkey", (req, res) => {
  ADManager.findVideoAds(req.params)
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

ADController.get("/image/find/:label", (req, res) => {
  ADManager.checkImageAd(req.params)
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

ADController.get("/video/find/:label", (req, res) => {
  ADManager.checkVideoAd(req.params)
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
      res.status(500).json({ success: false, msg: "Exception error" });
    });
});

module.exports = ADController;
