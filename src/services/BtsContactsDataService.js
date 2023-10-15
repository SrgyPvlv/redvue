import api from './api';

class BtsContactsDataService{

    getBtsContactsByBtsNumber(btsNumber){
        return api.get(`/btscontacts?btsNumber=${btsNumber}`);
    }
       
};

export default new BtsContactsDataService();