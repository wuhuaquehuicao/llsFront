const BaseManager = require("./BaseManager");

class LocationListManager extends BaseManager {
  constructor() {
    super();
  }
  findAll() {
    return super.get(`${this.APIURL}/locations`);
  }
  findByPage(params){
    let isDesc = params.order == 'desc' ? 1 : 0;
    let url = `${this.APIURL}/locations?limit=${params.limit}&offset=${params.offset}&clause=flag=0&order=${params.sort}&desc=${isDesc}`;
    return super.get(url);
  }
  findByKey(params){
    let url = encodeURI(`${this.APIURL}/locations?limit=${params.limit}&offset=${params.offset}&clause=name Like"%${params.key}%"&clause=address Like"%${params.key}%"`)
    return super.get(url);
  }
  create(data) {
    return super.postData(`${this.APIURL}/locations`, data);
  }
  findById(id) {
    return super.get(`${this.APIURL}/locations/${id}`);
  }
  update(id, data) {
    return super.put(`${this.APIURL}/locations/${id}`, data);
  }

  changeLocationPassword(data, locationid){
    return super.put(`${this.APIURL}/locations/${locationid}`, data);
  }
}

module.exports = new LocationListManager();
