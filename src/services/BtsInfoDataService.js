import api from './api';

class BtsInfoDataService{

    getBtsInfoByBtsNumber(btsNumber){
        return api.get(`/btsinfos?btsNumber=${btsNumber}`);
    }
    
    findAllByBtsNumber(btsNumber){
        return api.get(`/btsinfos/number?btsNumber=${btsNumber}`);
    }

    findAllByBtsAddress(btsAddress){
        return api.get(`/btsinfos/address?btsAddress=${btsAddress}`);
    }

    findAllByBtsNumderOrAddress(btsNumOrAddress){
        return api.get(`/btsinfos/numoraddr?btsNumOrAddress=${btsNumOrAddress}`);
    }
};

export default new BtsInfoDataService();