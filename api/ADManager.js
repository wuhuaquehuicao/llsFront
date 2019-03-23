const BaseManager = require("./BaseManager");

class ADManager extends BaseManager {
  constructor() {
    super();
  }
  create(adlistId, data) {
    return super.postData(`${this.APIURL}/adlists/${adlistId}/ads`, data);
  }

  findImageAds(params) {
    var path;
    if(params.searchkey == "undefined"){
      path = `${this.APIURL}/ads?limit=9&offset=0&clause=flag=0&clause=media_type='image'&or=false&desc=1&order=created_at`;
    }else{
      path = `${this.APIURL}/ads?limit=9&offset=0&clause=flag=0&clause=media_type='image'&or=false&clause=label Like"%${params.searchkey}%"&desc=1&order=created_at`;
    }
    console.log(path);
    var encodePath = encodeURI(path);
    return super.get(encodePath);
  }

  findVideoAds(params) {
    var path;
    if(params.searchkey == "undefined"){
      path = `${this.APIURL}/ads?limit=6&offset=0&clause=flag=0&clause=media_type='video'&or=false&desc=1&order=created_at`;
    }else{
      path = `${this.APIURL}/ads?limit=6&offset=0&clause=flag=0&clause=media_type='video'&or=false&clause=label Like"%${params.searchkey}%"&desc=1&order=created_at`;

    }

    var encodePath = encodeURI(path);
    return super.get(encodePath);
  }

  checkImageAd(params) {
    var path = `${this.APIURL}/ads?limit=9&offset=0&clause=flag=0&clause=media_type='image'&or=false&clause=label="${params.label}"`;
    console.log(path);
    var encodePath = encodeURI(path);
    return super.get(encodePath);
  }

  checkVideoAd(params) {
    var path = `${this.APIURL}/ads?limit=6&offset=0&clause=flag=0&clause=media_type='video'&or=false&clause=label="${params.label}"`;
    var encodePath = encodeURI(path);
    return super.get(encodePath);
  }
}

module.exports = new ADManager();
