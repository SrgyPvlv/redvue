import api from './api';

class KeyTypeDataService{

    getKeyTypeById(id){
        return api.get(`/keytypes/${id}`);
    }   
};

export default new KeyTypeDataService();