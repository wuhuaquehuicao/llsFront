var vd = require("validator");

class Device {
  constructor(data) {
    this.id = data.id || "";
    if(data.name != null){
    	this.name = data.name || "";
    }
    
    this.location_id = data.location_id || "";
    
    if(data.password != null){
    	this.password = data.password || "";
	}
  }
  formVd() {
    if (vd.isEmpty(this.id)) return "Id should not empty";
    return false;
  }
}

module.exports = Device;
