<template>
    <div v-if="currentEmployee" class="edit-form">
      <h4>Сотрудник</h4>
      <form class="was-validated">
        <div class="form-group">
          <label for="name" class="fw-bold">ФИО сотрудника</label>
          <input type="text" class="form-control mt-1" id="name" required v-model="currentEmployee.name" name="name" placeholder="Фамилия Имя Отчество"/>
        </div>

        <div class="form-group mt-3">
          <label for="mobilePhone" class="fw-bold">Мобильный телефон</label>
          <input type="text" class="form-control mt-1" id="mobilePhone" required v-model="currentEmployee.mobilePhone" name="mobilePhone" placeholder="Введите номер в формате: +79112223344"/>
        </div>

        <div class="form-group mt-3">
          <label for="birthday" class="fw-bold">Дата рождения</label>
          <input type="date" class="form-control mt-1" id="birthday" required v-model="currentEmployee.birthday" name="birthday"/>
        </div>

        <div class="form-group mt-3">
          <label for="localPhone" class="fw-bold">Местный телефон</label>
          <input type="number" class="form-control mt-1" id="localPhone" min="1" v-model="currentEmployee.localPhone" name="localPhone"/>
        </div>

        <div class="form-group mt-3">
          <label for="employeeId" class="fw-bold">Табельный номер</label>
          <input type="number" class="form-control mt-1" id="employeeId" min="1" required v-model="currentEmployee.employeeId" name="employeeId"/>
        </div>

        <div class="form-group mt-3">
          <label for="login" class="fw-bold">Логин</label>
          <input type="text" class="form-control mt-1" id="login" required v-model="currentEmployee.login" name="login"/>
        </div>

        <div class="form-group mt-3">
          <label for="email" class="fw-bold">E-mail</label>
          <input type="email" class="form-control mt-1" id="email" required v-model="currentEmployee.email" name="email"/>
        </div>

        <div class="form-group mt-3">
          <label for="employeeComment" class="fw-bold">Комментарий</label>
          <input type="text" class="form-control mt-1" id="employeeComment" v-model="currentEmployee.employeeComment" name="employeeComment"/>
        </div>

        <div class="form-group mt-3">
          <label for="factDepartment" class="fw-bold">Подразделение (факт):</label>
          <select class="form-select mt-1" id="factDepartment" name="factDepartment" v-model="currentEmployee.factDepartment" required>
           <option v-for="(department,index) in departments" :key="index" :value="department">
            {{ department.division!=null? department.division.division:'' }}
            {{ department.groupe!=null? '/'+department.groupe.groupe:'' }}
            {{ department.functionGroup!=null? '/'+department.functionGroup.functionGroup:'' }}
           </option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="staffDepartment" class="fw-bold">Подразделение (по штату):</label>
          <select class="form-select mt-1" id="staffDepartment" name="staffDepartment" v-model="currentEmployee.staffDepartment" required>
           <option v-for="(department,index) in departments" :key="index" :value="department">
            {{ department.division!=null? department.division.division:'' }}
            {{ department.groupe!=null? '/'+department.groupe.groupe:'' }}
            {{ department.functionGroup!=null? '/'+department.functionGroup.functionGroup:'' }}
           </option>
          </select>
        </div>
  
        <div class="form-group mt-3">
          <label for="position" class="fw-bold">Должность</label>
          <select class="form-select mt-1" id="position" name="position" v-model="currentEmployee.position" required>
           <option v-for="(position,index) in positions" :key="index" :value="position">{{position.position}}</option>
          </select>
        </div>

        <div class="form-group mt-3">
          <label for="car" class="fw-bold">Автомобиль</label>
          <select class="form-select mt-1" id="car" name="car" v-model="currentEmployee.car">
           <option :value="null">Нет</option>
           <option v-if="currentEmployee.car!=null" :value="currentEmployee.car">{{currentEmployee.car.carNumber}}</option>
           <option v-for="(car,index) in cars" :key="index" :value="car">{{car.carNumber}}</option>
          </select>
        </div>
      </form>

      <div class="mt-3">
      <button @click="updateEmployee" class="btn btn-outline-success me-3">Обновить</button>
      </div>

      <h5 class="mt-3 text-success">{{ message }}</h5>
    </div>

    <div v-else>
      <br>
      <p>Выберите сотрудника...</p>
    </div>
</template>

<script>
import EmployeesDataService from '../services/EmployeesDataService'
import CarsDataService from '../services/CarsDataService'
import PositionsDataService from '../services/PositionsDataService'
import DepartmentsDataService from '../services/DepartmentsDataService'
import EventBus from "../common/EventBus"

export default {
  name: "employee",
  data() {
    return {
      currentEmployee:null,
      message:"",
      cars:[],
      positions:[],
      departments:[],
      newEmployeeCar:null
    };
  },

  methods: {
      getEmployee(id) {
      EmployeesDataService.get(id)
      .then(response => {
        var currentEmployeeResponse = response.data;
        var currentEmployeeCar=null;
        if(currentEmployeeResponse.car!=null){
        currentEmployeeCar = {id: currentEmployeeResponse.car.id, carNumber : currentEmployeeResponse.car.carNumber, carComment : currentEmployeeResponse.car.carComment, carModel: currentEmployeeResponse.car.carModel};};
        this.currentEmployee = {
          id: currentEmployeeResponse.id,
          name: currentEmployeeResponse.name,
          mobilePhone: currentEmployeeResponse.mobilePhone,
          birthday: currentEmployeeResponse.birthday,
          localPhone: currentEmployeeResponse.localPhone,
          employeeId: currentEmployeeResponse.employeeId,
          login: currentEmployeeResponse.login,
          email: currentEmployeeResponse.email,
          employeeComment: currentEmployeeResponse.employeeComment,
          factDepartment: currentEmployeeResponse.factDepartment,
          staffDepartment: currentEmployeeResponse.staffDepartment,
          car: currentEmployeeCar,
          position: currentEmployeeResponse.position
        };
        console.log(response.data)
      })
      .catch(e => {
        console.log(e);
      });
  },

  updateEmployee() {
    EmployeesDataService.update(this.currentEmployee.id, this.currentEmployee)
      .then(response => {
        console.log(response.data);
        this.message = 'Данные по сотруднику успешно обновлены!';
      },
      error => {
        if (error.response && error.response.status === 410) {
              EventBus.dispatch("logout");};
        if (error.response && error.response.status === 501) {
              alert("Ошибка! Что-то пошло не так!");}
      })
      .catch(e => {
        console.log(e);
      });
  },

  retrievePositions(){
            PositionsDataService.getAll().
            then(response=>{
                this.positions=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          },

          retrieveCars(){
            CarsDataService.getAll().
            then(response=>{
                var carz=response.data;
                this.cars = carz.filter(e=>e.employee==null).map(c => {
                var newcar = {id: c.id, carNumber : c.carNumber, carComment : c.carComment, carModel: c.carModel};
                return newcar;});
                console.log(response.data);
                })
            .catch(e=>{console.log(e)});
          },
          
          retrieveDepartments(){
            DepartmentsDataService.getAll().
            then(response=>{
                this.departments=response.data;
                console.log(response.data);
            })
            .catch(e=>{console.log(e)});
          }
          },

  mounted(){
    this.message = '';
    this.getEmployee(this.$route.params.id);
    this.retrievePositions();
    this.retrieveCars();
    this.retrieveDepartments()
  }
}
</script>

<style>
.edit-form {
max-width: 450px;
}
</style>

