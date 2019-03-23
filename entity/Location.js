var vd = require("validator");

class Location {
  constructor(data) {
    this.name = data.name || "";
    this.contact = data.contact || "";
    this.email = data.email || "";
    this.phone = data.phone || "";
    this.address = data.address || "";
    this.active_adlist_id = data.active_adlist_id || "";
    this.password = data.password || "";
  }
  formVd() {
    if (vd.isEmpty(this.name)) return "Name should not empty";
    return false;
  }
}

module.exports = Location;
