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
        {
            path: '/compare/:user1?/:user2?',
            name: 'Compare',
            props: true,
            component: ()=>import('./components/Compare.vue'),
            meta:{
                title:"AAT - Compare"
            }
        },
    ],
    mode: 'history',
});
router.beforeResolve((to,from,next)=>{
    let pageTitle = to.meta.title;
    if(to.params.username)pageTitle = to.params.username+"'s profile"
    if(to.name){
        nProgress.start()
    }
    document.title = pageTitle;
    next()
});
router.afterEach(()=>{nProgress.done()});
export default router;
Vue.use(Router)