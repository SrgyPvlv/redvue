import api from './api';

class KeyTypeDataService{

    getKeyTypesByAboutBtsId(id){
        return api.get(`/keytypes?btsId=${id}`);
    }   
};

export default new KeyTypeDataService();