const BaseManager = require("./BaseManager");

class AdminManager extends BaseManager{
    constructor() {
        super();
    }

    findUsersByPage(params){
        let isDesc = params.order == 'desc' ? 1 : 0;
        let url = encodeURI(`${this.APIURL}/users?limit=${params.limit}&offset=${params.offset}&clause=flag=0&order=${params.sort}&desc=${isDesc}`);
         
        return super.get(url);
    }

    findUsersByKey(params){
        let isDesc = params.order == 'desc' ? 1 : 0;
        let url = encodeURI(`${this.APIURL}/users?limit=${params.limit}&offset=${params.offset}&clause=name Like"%${params.key}%"&order=${params.sort}&desc=${isDesc}`)
        return super.get(url);
    }

    create(data, adminid){
        return super.postData(`${this.APIURL}/users?adminid=${adminid}`, data);
    }

    removeUser(userid){
        return super.remove(`${this.APIURL}/users/${userid}`);
    }

    resetPassword(userid, adminid){
        return super.get(`${this.APIURL}/users/${userid}/resetpwd?adminid=${adminid}`);
    }

    changePassword(userid, data){
        return super.put(`${this.APIURL}/users/${userid}`, data);
    }

    updateUser(data, userid){
        super.put(`${this.APIURL}/users/${userid}`, data);
    }
}

module.exports = new AdminManager();