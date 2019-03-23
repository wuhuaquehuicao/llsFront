const BaseManager = require("./BaseManager");

class ADStatisticsManager extends BaseManager {
  constructor() {
    super();
  }
  findAll() {
    return super.get(`${this.APIURL}/ads`);
  }
  findByPage(params) {
    let isDesc = params.order == 'desc' ? 1 : 0;
    return super.get(
      `${this.APIURL}/ads/statics?from=${params.from}&to=${params.to}&limit=${params.limit}&offset=${params.offset}&clause=flag=0&order=${params.sort}&desc=${isDesc}`
    );
  }
}

module.exports = new ADStatisticsManager();