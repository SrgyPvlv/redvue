import {createRouter, createWebHashHistory} from 'vue-router';

const router=createRouter({
    history: createWebHashHistory(),
    routes:[
        {path:'/', alias:'/routers', name:'routers', component:()=>import("../components/Routers.vue")},
        {path:'/keys', name:'keys', component:()=>import("../components/Keys.vue")},
        {path:'/dgu', name:'dgu', component:()=>import("../components/Dgu.vue")}
    ]
});

export default router;