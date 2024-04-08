import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageIPsList',

            component: () => import('@/map_modules/setting/manageIPs/list.vue'),
        },
        {
            path: 'addIP',
            name: 'addIP',

            component: () => import('@/map_modules/setting/manageIPs/addIP.vue'),
        },
        {
            path: 'userIp',
            name: 'userIp',

            component: () => import('@/map_modules/setting/manageIPs/userIp.vue'),
        },
        {
            path: 'editIp/:data',
            name: 'editIp',

            component: () => import('@/map_modules/setting/manageIPs/editIP.vue'),
        }

    ]


