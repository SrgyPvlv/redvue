import api from './api';

class AmsTypeDataService{

    getAmsTypeById(id){
        return api.get(`/amstypes/${id}`);
    }   
};

export default new AmsTypeDataService();