import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageTablesList',

            component: () => import('@/map_modules/setting/manageTables/list.vue'),
        },


    ]


