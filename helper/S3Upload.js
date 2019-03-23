const fs = require("fs");
const AWS = require("aws-sdk");
const path = require("path");
AWS.config.loadFromPath(path.join(__dirname, "../config/AwsConfig.json"));

module.exports = function(srcPath, filename, bucket) {
  var s3Bucket = new AWS.S3({ params: { Bucket: bucket } });
  var srcFile = fs.readFileSync(srcPath);
  var data = { Key: filename, Body: srcFile, ACL: "public-read" };

  return new Promise((resolve, reject) => {
    s3Bucket.putObject(data, function(err, data) {
      if (err) {
        reject(new Error("S3 upload failure", err));
      } else {
        console.log("Upload to S3 Succesfully");
        resolve(data);
      }
    });
  });
};
