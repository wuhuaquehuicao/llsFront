const BaseManager = require("./BaseManager");

class DevicesManager extends BaseManager {
  constructor() {
    super();
  }
  findAll() {
    return super.get(`${this.APIURL}/devices`);
  }

  findById(id) {
    return super.get(`${this.APIURL}/devices/${id}`);
  }

  findByPage(params){
    let isDesc = params.order == 'desc' ? 1 : 0;
    let url = `${this.APIURL}/devices?limit=${params.limit}&offset=${params.offset}&clause=flag=0&order=${params.sort}&desc=${isDesc}`;
    return super.get(url);
  }

  findByKey(params){
    var locationKeys = params.locationKeys.split(",");
    var macKey = params.key.split(":").join("");
    
    var locationSearchP = `${this.APIURL}/devices?limit=${params.limit}&offset=${params.offset}&clause=name Like"%${params.key}%"&clause=id Like"%${macKey}%"&order=created_at`;
  
    for(var x=0; x< locationKeys.length;x++){
      var key = locationKeys[x];
      locationSearchP += `&clause=location_id = '${key}'`
    }

    let url = encodeURI(locationSearchP)
    return super.get(url);
  }

  update(data) {
   // console.log(data);
    return super.put(`${this.APIURL}/devices/${data.id}`, data);
  }

  batchUpdateDevices(data, locationid){
    return super.postData(`${this.APIURL}/locations/${locationid}/adddevices`, data);
  }
}

module.exports = new DevicesManager();
