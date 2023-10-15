import api from './api';

class PositionsDataService{

    get(id){
        return api.get(`/positions/${id}`);
    }

    getAll(){
        return api.get("/positions");
    }

    create(data){
        return api.post('/positions', data);
    }

    update(id, data){
        return api.put(`/positions/${id}`, data);
    }

    delete(id){
        return api.delete(`/positions/${id}`);
    }
};

export default new PositionsDataService();