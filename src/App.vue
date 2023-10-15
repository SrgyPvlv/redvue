<template>
  <div id="app">
    <nav class="navbar navbar-expand bg-danger navbar-dark p-2 sticky-top">
      <img src="./components/icons/logored.png" alt="Логотип" style="width:40px;" class="rounded-pill border border-white"> <span class="redlogo fw-weight-bold fs-5"> MyRED</span>
      <ul class="navbar-nav">
        <li class="nav-item">
          <RouterLink to="/routers" class="nav-link fs-5">Проходки</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/keys" class="nav-link fs-5">Журнал Ключей</RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink to="/dgu" class="nav-link fs-5">Журнал ДГУ</RouterLink>
        </li>
      </ul>
    </nav>
  
    <div class="container ms-5 mt-3 mb-5">
      <RouterView />
    </div>
    
    <div class="text-center p-1 text-light fixed-bottom footer">
      © SrgyPvlv <a href="mailto:spavlov@mts.ru?subject=Вопрос по Приложению: MyRed" class="ms-2 text-light text-decoration-none"> &#128386 </a>
    </div>
  </div>
  </template>
  
  <script>
  import EventBus from "./common/EventBus"
  
  export default{
    name:"app",
  
      methods: {
      logOut() {
        this.$store.dispatch('auth/logout');
        this.$router.push('/login');
      }
    },
  
    mounted() {
      EventBus.on("logout", () => {
        this.logOut();
      });
    },
    beforeDestroy() {
      EventBus.remove("logout");
    }
  };
  </script>
  
  <style>
  .redlogo{
    margin-left:5px;
    margin-right:10px;

  }
  .footer{
    background: #778899;
  }
  .exitpointer,.exelpointer{
    cursor:pointer;
  }
  /* width */
  ::-webkit-scrollbar {
    width: 10px;
  }
  
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px grey; 
    border-radius: 5px;
  }
   
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: red; 
    border-radius: 5px;
  }
  
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #b30000; 
  }
  </style>