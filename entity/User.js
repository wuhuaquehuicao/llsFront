var vd = require("validator");

class User {
  constructor(data) {
    this.id = data.id || "";
    this.name = data.name || "";
    this.password = data.password || "";
  }
  formVd() {
    if (vd.isEmpty(this.name)) return "Name should not empty";
    if (vd.isEmpty(this.password)) return "Password should not empty";
    if (!vd.isLength(this.password, { min: 5 }))
      return "Password length should large than 5.";
    return false;
  }
}

module.exports = User;
