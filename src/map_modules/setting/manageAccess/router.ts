import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'manageAccessList',
            name: 'manageAccessList',

            component: () => import('@/map_modules/setting/manageAccess/list.vue'),
        },
        {
            path: 'addAccess',
            name: 'addAccess',

            component: () => import('@/map_modules/setting/manageAccess/addAccess.vue'),
        },
        {
            path: 'editAccess/:data',
            name: 'editAccess',

            component: () => import('@/map_modules/setting/manageAccess/editAccess.vue'),
        },


    ]


