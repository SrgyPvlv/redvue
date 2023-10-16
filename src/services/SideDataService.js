import api from './api';

class SideDataService{

    getSideById(id){
        return api.get(`/sides/${id}`);
    }   
};

export default new SideDataService();