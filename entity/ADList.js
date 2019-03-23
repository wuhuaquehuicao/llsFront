var vd = require("validator");

class ADList {
  constructor(data) {
    // this.id = data.id || "";
    this.name = data.name || "";
    this.description = data.description || "";
    this.layout = data.layout || "";
    this.slide_interval = data.slideInterval || "";
  }
  formVd() {
    if (vd.isEmpty(this.name)) return "Name should not empty";
    return false;
  }
}

module.exports = ADList;
