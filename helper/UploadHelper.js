const uuidv1 = require("uuid/v1");
var multer = require("multer");
var path = require("path");
var { mkdirsSync } = require("./FileHelper");

var uuid = "";

function newDestDir(type) {
  uuid = uuidv1().replace(/-/g, "");
  var destDir = path.resolve(`./public/media/${type}`);
  mkdirsSync(destDir);
  return destDir;
}

function newFileName(file) {
  return uuid + path.extname(file.originalname);
}

const imageUpload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, newDestDir("image"));
    },
    filename: function(req, file, cb) {
      cb(null, newFileName(file));
    }
  }),
  limits: { fileSize: 10 * 1024 * 1024 }
});

const videoUpload = multer({
  storage: multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, newDestDir("video"));
    },
    filename: function(req, file, cb) {
      cb(null, newFileName(file));
    }
  }),
  limits: { fileSize: 50 * 1024 * 1024 }
});

module.exports = { imageUpload, videoUpload };
