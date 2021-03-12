import Vue from 'vue'
import Router from 'vue-router'
import nProgress from 'nprogress'

const router = new Router({
    routes:[
        {
            path: '/',
            name: 'home',
            component: ()=>import('./components/Home.vue'),
            meta:{
                title:"AAT"
            }
        },
        {
            path: '/achievements',
            name: 'Achievements',
            component: ()=>import('./components/Achievements.vue'),
            meta:{
                title:"AAT - Achievements"
            }
        },
        {
            path: '/profile/:username',
            name: 'Profile',
            props: true,
            component: ()=>import('./components/Profile.vue'),
            meta:{
                title:"AAT - Profile"
            }
        },
    ],
    mode: 'history',
});
router.beforeResolve((to,from,next)=>{
    if(to.name){
        nProgress.start()
    }
    document.title = to.meta.title;
    next()
});
router.afterEach(()=>{nProgress.done()});
export default router;
Vue.use(Router)