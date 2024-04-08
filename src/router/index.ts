import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'
import {routes as layer_routes} from '@/map_modules/layer/router'
import {routes as setting_routes} from '@/map_modules/setting/router'
import {routes as feature_routes} from '@/map_modules/feature/router'
import {routes as search_routes} from '@/map_modules/search/router'
import {routes as analyze_routes} from '@/map_modules/analyze/router'
import {routes as survey_routes} from '@/map_modules/survey/router'
import {routes as panel_routes} from '@/map_modules/userPanel/router'
import {routes as print_routes} from '@/map_modules/print/router'
import {UserActions} from "@/store/user/actions";
import store from '@/store';
import JWTs from '@/componentFunctions/jwt_functions'
import {UserMutations} from "@/store/user/mutations";
import {setHeader} from "@/api/config";
import {routes as surveyPanel_routes} from "@/map_modules/survey/surveyPanel/router";
import {routes as haffari_routes} from "@/map_modules/haffari/router";
import {routes as haffari_pages_routes} from "@/map_modules/haffari/pages/router";


const {getUserInfo} = JWTs()
const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: 'layer',
                name: 'layer',
                component: () => import( '@/map_modules/layer/layer.vue'),
                children: layer_routes,

            },
            {
                path: 'setting',
                name: 'setting',
                component: () => import( '@/map_modules/setting/setting.vue'),
                children: setting_routes
            },
            {
                path: 'feature',
                name: 'feature',
                component: () => import( '@/map_modules/feature/feature.vue'),
                props: true,
                children: feature_routes

            },
            {
                path: 'search',
                name: 'search',
                component: () => import( '@/map_modules/search/search.vue'),
                props: true,
                children: search_routes

            },

            {
                path: 'measurement',
                name: 'measurement',
                component: () => import( '@/map_modules/measurement/Measurement.vue'),
                props: true,

            },

            {
                path: 'info',
                name: 'info',
                component: () => import( '@/map_modules/info/Info.vue'),
                props: true,

            },

            {
                path: 'graticule',
                name: 'graticule',
                component: () => import( '@/map_modules/graticule/Graticule.vue'),
                props: true,

            },

            {
                path: 'analyze',
                name: 'analyze',
                component: () => import( '@/map_modules/analyze/analyze.vue'),
                props: true,
                children:analyze_routes

            },

            {
                path: 'userPanel',
                name: 'userPanel',
                component: () => import( '@/map_modules/userPanel/UserPanel.vue'),
                props: true,
                children:panel_routes

            },



            {
                path: 'print',
                name: 'print',
                component: () => import( '@/map_modules/print/Print.vue'),
                props: true,
                children:print_routes

            },


        ],
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue')
    },
    {
        path: '/page',
        name: 'page',
        component: () => import('@/views/HomeView.vue'),

        children:[
            {
                path:'main',
                name: 'mainPage',
                component:()=> import('@/map_modules/info/Info.vue'),
                props:{fullScreen:true}
            },
            {
                path: 'measurement',
                name: 'pageMeasurement',
                component: () => import( '@/map_modules/measurement/Measurement.vue'),
                props: true,

            },
        ],
        props:{fullScreen:true,page:true}
    },
    {
        path: '/survey',
        name: 'survey',
        component: () => import('@/map_modules/survey/survey.vue'),
        children:survey_routes,

    },
    {
        path: '/surveyPanel',
        name: 'surveyPanel',
        component: () => import('@/map_modules/survey/surveyPanel/Panel.vue'),
        children: surveyPanel_routes
    },
    {
        path: '/haffari',
        name: 'haffari',
        component: () => import('@/map_modules/haffari/Haffari.vue'),
        children: haffari_routes
    },
    {
        path: '/haffariPages',
        name: 'haffariPages',
        component: () => import('@/map_modules/haffari/pages/Pages.vue'),
        props:{fullScreen:true,page:true},
        children: haffari_pages_routes
    },

]

const router = createRouter({
    history: createWebHistory('sdi/front/'),
    routes
})

//--------------------login middleware---------------//
// router.beforeEach(async (to, from) => {
//     // console.log(to.query.key)
//     if (to.name !== 'login') {
//         if (to.name !== 'home') {
//             //
//             // return true//??????????????????????

//             if (store.getters.getUser.role.is_superuser) {
//                 return true
//             } else {
//                 if ('key' in to.query){
//                     setHeader(String(to.query.key))
//                     const user_info = await getUserInfo()
//                     await store.commit(UserMutations.SET_USER, user_info.user)
//                 }else if (store.getters.getUser.role.accessRoutes.length === 0) {
//                     if (localStorage.getItem('USER')) {
//                         await store.dispatch(UserActions.CHECK_USER)
//                         // const user_info = await getUserInfo()
//                         // await store.commit(UserMutations.SET_USER, user_info.user)
//                     } else {
//                         return {name: 'login'}
//                     }
//                 }

//                 ////----------دسترسی route  در صفحات --------------
//                 // router.options.routes
//                 if (store.getters.getUser.role.is_superuser){
//                     console.log('user is super user')
//                     return true
//                 }
//                 return store.dispatch(UserActions.CHECK_ACCESS, to).then((res: boolean) => {
//                     store.commit('set_router_access_denied_alert', !res)
//                     return res
//                 })
//                 ////----------دسترسی route  در صفحات --------------
//             }

//         } else {
//             if (!localStorage.getItem('USER')) {
//                 return {name: 'login'}
//             }

//         }


//     }


// })
//--------------------login middleware---------------//
export default router



