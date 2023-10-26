import api from './api';

class BtsCoordDataService{

    getBtsCoordByBtsNumber(btsNumber){
        return api.get(`/btscoordinates?btsNumber=${btsNumber}`);
    }
       
};

export default new BtsCoordDataService();