import api from './api';

class BtsBatteryDataService{

    getBtsBatteryByBtsNumber(btsNumber){
        return api.get(`/btsbatteries?btsNumber=${btsNumber}`);
    }
       
};

export default new BtsBatteryDataService();