var vd = require("validator");

class File {
  constructor(data) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.advertisementId = data.advertisementId || "";
    this.path = data.path || "";
    this.mediaType = data.mediaType || "";
  }
  formVd() {
    if (vd.isEmpty(this.name)) return "Name should not empty";
    return false;
  }
}

module.exports = File;
