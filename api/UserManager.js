const BaseManager = require("./BaseManager");

class UserManager extends BaseManager {
  constructor() {
    super();
  }
  login(data = {}) {
    return super.postData(`${this.APIURL}/users/login`, data);
  }
}

module.exports = new UserManager();
