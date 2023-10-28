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
                <span class="h4"> БС № {{ currentBtsNumber }} </span>
                <span class="fs-4 ms-2">({{ currentBtsSide }})</span>
                <span class="fs-6 ms-3">
                <a :href="'https://yandex.ru/maps/?pt='+currentBtsCoordB+','+currentBtsCoordA+'&z=15&l=map'" target="_blank"><img src="./icons/yamaps.png" width="30" height="30" title="Смотреть на карте"></a>
                </span>
                <h5>{{ currentBtsAddress }}</h5>
                <div>
                    <label><strong>Ключ: </strong></label> {{ currentBtsKey }}
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
            </div>

            <div v-else>
                <br>
                <p>Выберите БС...</p>
            </div>
        </div>
        <div class="col-md-1">
          <div>
            <span @click="showContacts" class="badge rounded-pill bg-info border-0 fs-6 akbbtn">Контакты</span> 
          </div>  
          <div class="mt-3">
            <span @click="showBatteries" class="badge rounded-pill bg-warning border-0 fs-6 akbbtn">АКБ</span> 
          </div>
          <div class="mt-3">
            <span @click="showGeneralInfo" class="badge rounded-pill bg-success border-0 fs-6 akbbtn">Общее</span> 
          </div>
        </div>
    </div>

    <div id="myModal" class="modal">
       <div class="modal-content">
        <span @click="hideBatteries" class="text-end close">&times;</span>
        <span class="text-center h4 text-primary">Состояние АКБ</span>
            <table class="mt-3 mb-3">
                <tr>
                    <th style="width:24%">Тип АКБ</th><th style="width:10%">Емкость АКБ</th><th style="width:11%">Ток оборудования</th>
                    <th style="width:11%">Время работы от АКБ</th>
                    <th style="width:17%">ЭПУ №1</th><th style="width:17%">ЭПУ №2</th><th style="width:10%">Выпрямители</th>
                </tr>
                <tr v-for="(currentBtsBatt, index) in currentBtsBatts" :key="index">
                    <td>{{ currentBtsBatt.battary_type }}</td><td>{{ currentBtsBatt.battary_capacity }}</td><td>{{ currentBtsBatt.equip_curr }}</td>
                    <td>{{ currentBtsBatt.equip_curr!=0 ? Math.round(currentBtsBatt.battary_capacity*0.7/currentBtsBatt.equip_curr) : '' }}</td>
                    <td>{{ currentBtsBatt.powerbox1 }}</td><td>{{ currentBtsBatt.powerbox2 }}</td><td>{{ currentBtsBatt.num_of_units }}</td>
                </tr>
            </table>
       </div>
    </div>
    <div id="myModal2" class="modal">
       <div class="modal-content">
        <span @click="hideGeneralInfo" class="text-end close">&times;</span>
        <span class="text-center h4 text-primary">Общая информация</span>
            <table class="mt-3">
                <tr>
                    <th style="width:7%">Номер</th><th style="width:35%">Адрес</th><th style="width:10%">Широта</th>
                    <th style="width:10%">Долгота</th><th style="width:10%">Направление</th><th style="width:10%">Время на дорогу</th>
                </tr>
                <tr>
                    <td>{{ currentBtsNumber }}</td><td>{{ currentBtsAddress }}</td><td>{{ currentBtsCoordA }}</td>
                    <td>{{ currentBtsCoordB }}</td><td>{{ currentBtsSide }}</td><td>{{ currentBtsTravelTime }}</td>
                </tr>
            </table>
            <table class="mt-5 mb-3">
                <tr>
                    <th style="width:25%">Тип АМС</th><th style="width:25%">Высота АМС</th><th style="width:25%">Тип аппаратной</th><th style="width:25%">Ключ</th>
                </tr>
                <tr>
                    <td>{{ currentBtsAms }}</td><td>{{ currentBtsAmsHeight }}</td><td>{{ currentBtsSite }}</td><td>{{ currentBtsKey }}</td>
                </tr>
            </table>
       </div>
    </div>
    <div id="myModal3" class="modal">
       <div class="modal-content">
        <span @click="hideContacts" class="text-end close">&times;</span>
        <span class="text-center h4 text-primary">Контакты</span>
        <table class="mt-3 mb-3">
            <tr>
                <th style="width:17%">Тема</th><th style="width:10%">ФИО</th><th style="width:11%">Должность</th>
                <th style="width:11%">Телефон</th>
                <th style="width:11%">Почта</th><th style="width:17%">Комментарий</th><th style="width:7%">Дата</th>
            </tr>
            <tr v-for="(currentBtsContact,index) in currentBtsContacts" key="index">
                <td style="width:17%;font-weight: bold;">{{currentBtsContact.theme!=null? currentBtsContact.theme : ''}}</td><td style="width:10%">{{currentBtsContact.name!=null? currentBtsContact.name: '' }}</td>
                <td style="width:11%">{{currentBtsContact.doljnost!=null? currentBtsContact.doljnost : '' }}</td>
                <td style="width:11%">{{currentBtsContact.phone!=null? currentBtsContact.phone : '' }}</td>
                <td style="width:11%">{{currentBtsContact.mail!=null? currentBtsContact.mail : '' }}</td>
                <td style="width:17%">{{currentBtsContact.comment!=null? currentBtsContact.comment : '' }}</td>
                <td style="width:7%">{{currentBtsContact.act_date!=null? currentBtsContact.act_date.split('-').reverse().join('.') : '' }}</td>
            </tr> 
        </table>
       </div>
    </div>
</template>

<script>
import RouterDataService from '../services/RouterDataService';
import BtsInfoDataService from '../services/BtsInfoDataService';
import KeyTypeDataService from '../services/KeyTypeDataService';
import BtsContactsDataService from '../services/BtsContactsDataService';
import SideDataService from '../services/SideDataService';
import BtsCoordDataService from '../services/BtsCoordDataService';
import BtsBatteryDataService from '../services/BtsBatteryDataService';
import SiteTypeDataService from '../services/SiteTypeDataService';
import AmsTypeDataService from '../services/AmsTypeDataService';

export default{
    name: "routers",
    data(){
        return{
            btss:[],
            currentBts:null,
            currentBtsInfo:null,
            currentBtsNumber:"",
            currentBtsAddress:"",
            currentBtsCoordA:"",
            currentBtsCoordB:"",
            currentBtsContacts:[],
            currentBtsKey:"",
            currentBtsAms:"",
            currentBtsAmsHeight:"",
            currentBtsTravelTime:"",
            currentBtsSite:"",
            currentBtsSide:"",
            currentBtsCoord:"",
            currentBtsBatts:[],
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
            currentBtsNumber="",
            currentBtsAddress="",
            currentBtsCoordA="",
            currentBtsCoordB="",
            this.currentBtsKey="";
            this.currentBtsSide="",
            this.currentBtsAms="",
            this.currentBtsSite="",
            this.currentBtsCoord="",
            this.currentBtsAmsHeight="",
            this.currentBtsTravelTime="",
            this.currentBtsContacts=[],
            this.currentBtsBatts=[]
        },
        
        setActiveBts(bts,index){
            this.currentBts = bts;
            this.currentIndex = bts ? index : -1;
            this.getRouteByBtsNumber(this.currentBts.bts_number);
            this.getBsContacts(this.currentBts.bts_number);
            this.getBsCoord(this.currentBts.bts_number);
            this.getBsBatteries(this.currentBts.bts_number);
            setTimeout(()=>this.getKeyType(this.currentBtsInfo.id_key_type),30);
            setTimeout(()=>this.getSide(this.currentBtsInfo.id_side),30);
            setTimeout(()=>this.getSiteType(this.currentBtsInfo.id_site),30);
            setTimeout(()=>this.getAmsType(this.currentBtsInfo.id_ams_type),30);
            setTimeout(()=>this.getcurrentBtsNumber(),30);
            setTimeout(()=>this.getcurrentBtsAddress(),30);
            setTimeout(()=>this.getcurrentBtsCoordA(),30);
            setTimeout(()=>this.getcurrentBtsCoordB(),30);
            setTimeout(()=>this.getcurrentBtsAmsHeight(),30);
            setTimeout(()=>this.getcurrentBtsTravelTime(),30);
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
        getSide(id){
            SideDataService.getSideById(id).
            then(response=>{
                this.currentBtsSide=response.data.type;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getSiteType(id){
            SiteTypeDataService.getSiteTypeById(id).
            then(response=>{
                this.currentBtsSite=response.data.type;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getAmsType(id){
            AmsTypeDataService.getAmsTypeById(id).
            then(response=>{
                this.currentBtsAms=response.data.type;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getBsCoord(btsNumber){
            BtsCoordDataService.getBtsCoordByBtsNumber(btsNumber).
            then(response=>{
                this.currentBtsCoord=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
        },
        getBsBatteries(btsNumber){
            BtsBatteryDataService.getBtsBatteryByBtsNumber(btsNumber).
            then(response=>{
                this.currentBtsBatts=response.data;
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
        getcurrentBtsNumber(){
            this.currentBtsNumber = this.currentBts.bts_number;
        },
        getcurrentBtsAddress(){
            this.currentBtsAddress = this.currentBts.address;
        },
        getcurrentBtsCoordA(){
            this.currentBtsCoordA = this.currentBtsCoord.coord_a;
        },
        getcurrentBtsCoordB(){
            this.currentBtsCoordB = this.currentBtsCoord.coord_b;
        },
        getcurrentBtsAmsHeight(){
            this.currentBtsAmsHeight = this.currentBtsInfo.ams_height;
        },
        getcurrentBtsTravelTime(){
            this.currentBtsTravelTime = this.currentBts.travel_time;
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
        },
        showBatteries(){
            var modal = document.getElementById("myModal");
            modal.style.display = "block";
        },
        hideBatteries(){
            var modal = document.getElementById("myModal");
            modal.style.display = "none";
        },
        showGeneralInfo(){
            var modal = document.getElementById("myModal2");
            modal.style.display = "block";
        },
        hideGeneralInfo(){
            var modal = document.getElementById("myModal2");
            modal.style.display = "none";
        },
        showContacts(){
            var modal = document.getElementById("myModal3");
            modal.style.display = "block";
        },
        hideContacts(){
            var modal = document.getElementById("myModal3");
            modal.style.display = "none";
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
/* The Modal (background) */
.modal {
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 2; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 12% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
  animation-name: animatetop;
  animation-duration: 0.6s
}

/* Add Animation */
@keyframes animatetop {
  from {top: -300px; opacity: 0}
  to {top: 0; opacity: 1}
}

/* The Close Button */
.close {
  color: red;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

th, td {
  border: 1px solid black;
}
th, td {
  text-align: center;
}
th {
    background-color: #96D4D4;
}

.rightnav{
    position: absolute;
    right: 20px;
}
.akbbtn{
    width: 150px;
    cursor:pointer
}
</style>