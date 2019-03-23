const BaseManager = require("./BaseManager");

class ADListManager extends BaseManager {
  constructor() {
    super();
  }
  findAll() {
    return super.get(`${this.APIURL}/adlists`);
  }
  findByPage(params) {
    let isDesc = params.order == 'desc' ? 1 : 0;
    let url = `${this.APIURL}/adlists?limit=${params.limit}&offset=${params.offset}&clause=flag=0&order=${params.sort}&desc=${isDesc}`;
    return super.get(url);
  }
  findByFilter(params) {
    let url;
    url = `${this.APIURL}/adlists?limit=${params.limit}&offset=${
      params.offset
    }`;
/*    if (params.filter.name) {
      url += `&clause=name Like'%${params.filter.name}%'`;
    }
    if (params.filter.layout) {
      url += `&clause=layout='${params.filter.layout}'`;
    }
*/
    if(params.key) {
      url += `&clause=name Like"%${params.key}%"`;
    }

    url = encodeURI(url);
    return super.get(url);
  }
  create(data) {
    return super.postData(`${this.APIURL}/adlists`, data);
  }
  findById(id) {
    return super.get(`${this.APIURL}/adlists/${id}`);
  }
  update(id, data) {
    return super.put(`${this.APIURL}/adlists/${id}`, data);
  }
  remove(adlist_id, ad_id){
    let url = super.remove(`${this.APIURL}/adlists/${adlist_id}/ads/${ad_id}`);
    return url;
  }

  removeAdList(id){
    return super.remove(`${this.APIURL}/adlists/${id}`);
  }

  addAD(adlist_id, data){
    return super.postData(`${this.APIURL}/adlists/${adlist_id}/ads`, data);
  }
}

module.exports = new ADListManager();
