import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageKEYsList',

            component: () => import('@/map_modules/setting/manageAPIKEYs/list.vue'),
        },
        {
            path: 'addKEY',
            name: 'addKEY',

            component: () => import('@/map_modules/setting/manageAPIKEYs/addKEY.vue'),
        },
        {
            path: 'editKEY/:data',
            name: 'editKEY',

            component: () => import('@/map_modules/setting/manageAPIKEYs/editKEY.vue'),
        }

    ]

