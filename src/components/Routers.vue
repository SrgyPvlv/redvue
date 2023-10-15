<template>
    <div class="list row">
        <div class="col-md-8">
            
            <div class="input-group mb-3">
                <form @submit.prevent="findAllByBtsNumderOrAddress">
                <input type="text" class="form-control inputform" placeholder="Поиск по номеру или адресу БС" v-model="filter" />
                </form>
                <div class="input-group-append ms-3">
                <button type="button" class="btn btn-outline-danger" @click="refreshList">Сбросить</button>
                </div>
                <div class="input-group-append ms-3">
                </div>                                              
            </div>
            
        </div>
    </div>
    <div class="list row">
        <div class="col-md-5 ">
        <h4> Список БС </h4>
        <div class="col-md-12 outdiv shadow">
            <div class="col-md-12 indiv">
            <ul class="list-group list-group-flush list-group-numbered">
                <li class="list-group-item bts" 
                :class="{ active: index == currentIndex }"
                v-for="(bts, index) in btss"
                :key="index"
                @click="setActiveBts(bts,index)">
                <span class="fw-bolder">{{ bts.bts_number }}</span>  {{ bts.address }}
                </li>
            </ul>
            </div>
        </div>
        </div>
        <div class="col-md-6">
            <div v-if="currentBts">
                <h4> БС № {{ currentBts.bts_number }} </h4>
                <h5>{{ currentBts.address }}</h5>
                <div>
                    <label><strong>Ключ: </strong></label> {{ this.currentBtsKey }}
                </div>
                <div>
                    <label><strong>Проезд:</strong></label><br> {{ currentBtsInfo.way_info!=null?currentBtsInfo.way_info:'' }}
                </div>
                <div>
                    <label><strong>Проход внутри здания:</strong></label> <br>{{ currentBtsInfo.inner_info!=null ? currentBtsInfo.inner_info:'' }}
                </div>
                <div>
                    <label><strong>Электропитание:</strong></label> <br>{{ currentBtsInfo.reception_info!=null ? currentBtsInfo.reception_info:'' }}
                </div>
                <div>
                    <label><strong>Проход к АФУ:</strong></label> <br>{{ currentBtsInfo.ams_info!=null ? currentBtsInfo.ams_info:'' }}
                </div>
                
                <div>
                    <label><strong>Контакты:</strong></label> <button @click="toggle" class="badge rounded-pill bg-info border-0">{{contactshow?'скрыть':'показать'}}</button>
                    <ul v-if="contactshow">
                        <li v-for="(currentBtsContact,index) in currentBtsContacts" key="index">
                        <mark>{{currentBtsContact.theme!=null? currentBtsContact.theme : ''}}</mark><br>
                        {{currentBtsContact.name!=null? 'ФИО: '+currentBtsContact.name: '' }}<br v-if="currentBtsContact.name!=null">
                        {{currentBtsContact.doljnost!=null? 'Должность: '+currentBtsContact.doljnost : '' }}<br v-if="currentBtsContact.doljnost!=null">
                        {{currentBtsContact.phone!=null? 'Телефон: '+currentBtsContact.phone : '' }}<br v-if="currentBtsContact.phone!=null">
                        {{currentBtsContact.mail!=null? 'Почта: '+currentBtsContact.mail : '' }}<br v-if="currentBtsContact.mail!=null">
                        {{currentBtsContact.comment!=null? 'Комментарий: '+currentBtsContact.comment : '' }}<br v-if="currentBtsContact.comment!=null">
                        {{currentBtsContact.act_date!=null? 'Дата создания: '+currentBtsContact.act_date.split('-').reverse().join('.') : '' }}
                        </li>
                    </ul>
                </div>

            </div>
            <div v-else>
                <br>
                <p>Выберите БС...</p>
            </div>
        </div>
    </div>
</template>

<script>
import RouterDataService from '../services/RouterDataService';
import BtsInfoDataService from '../services/BtsInfoDataService';
import KeyTypeDataService from '../services/KeyTypeDataService';
import BtsContactsDataService from '../services/BtsContactsDataService';

export default{
    name: "routers",
    data(){
        return{
            btss:[],
            currentBts:null,
            currentBtsInfo:null,
            currentBtsContacts:[],
            currentBtsKey:"",
            currentIndex:-1,
            filter:"",
            contactshow:false
        };
    },
    
    methods:{

        refreshList(){
            this.currentBts = null;
            this.currentIndex = -1;
            this.filter="";
            this.btss = [];
            this.currentBtsInfo=null,
            this.currentBtsKey="";
            this.currentBtsContacts=[]
        },
        
        setActiveBts(bts,index){
            this.currentBts = bts;
            this.currentIndex = bts ? index : -1;
            this.getRouteByBtsNumber(this.currentBts.bts_number);
            this.getBsContacts(this.currentBts.bts_number);
            setTimeout(()=>this.getKeyType(this.currentBtsInfo.id_key_type),30);
        },
        getRouteByBtsNumber(btsNumber){
            RouterDataService.getRouteByBtsNumber(btsNumber).
            then(response=>{
                this.currentBtsInfo=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getKeyType(id){
            KeyTypeDataService.getKeyTypeById(id).
            then(response=>{
                this.currentBtsKey=response.data.type;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getBsContacts(btsNumber){
            BtsContactsDataService.getBtsContactsByBtsNumber(btsNumber).
            then(response=>{
                this.currentBtsContacts=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        toggle(){
            this.contactshow =! this.contactshow;
        },
        findAllByBtsNumber(){
            BtsInfoDataService.findAllByBtsNumber(this.filter).
            then(response=>{
                this.btss=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        findAllByBtsAddress(){
            BtsInfoDataService.findAllByBtsAddress(this.filter).
            then(response=>{
                this.btss=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        findAllByBtsNumderOrAddress(){
            BtsInfoDataService.findAllByBtsNumderOrAddress(this.filter).
            then(response=>{
                this.btss=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        }
        }
};
</script>

<style>
.edit{
    margin-top:10px;
    text-decoration:none
}
.delete,.sertif{
    text-decoration: none
}
.bts{
    cursor:pointer
}
.outdiv{
    overflow-y: auto;
    overflow-x: hidden;
    height: 700px;
    position: relative;
}
.indiv{
    position: absolute   
}
.inputform{
    width:450px;
}
/* width */
::-webkit-scrollbar {
  width: 15px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 2px grey; 
  border-radius: 7px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: #C0C0C0; 
  border-radius: 7px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #b30000; 
}
.customselect{
    border:none;
    width:215px
}
.listyle{
    list-style-type: none;
}
</style>