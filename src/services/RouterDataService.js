import api from './api';

class RouterDataService{

    getRouteByBtsNumber(btsNumber){
        return api.get(`/routes?btsNumber=${btsNumber}`);
    }   
};

export default new RouterDataService();