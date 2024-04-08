import {RouteRecordRaw} from "vue-router";



export const routes: Array<RouteRecordRaw> = [
    {
        path: 'carTable',
        name: 'carTable',
        component: () => import('@/map_modules/userPanel/cartable/Cartable.vue'),
    },


]