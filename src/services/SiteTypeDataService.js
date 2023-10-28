import api from './api';

class SiteTypeDataService{

    getSiteTypeById(id){
        return api.get(`/sitetypes/${id}`);
    }   
};

export default new SiteTypeDataService();