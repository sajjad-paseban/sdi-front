import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'manageDataBases',
            name: 'manageDataBases',

            component: () => import('@/map_modules/setting/manageConnections/dataBases/list.vue'),
        },
        {
            path: 'manageServices',
            name: 'manageServices',

            component: () => import('@/map_modules/setting/manageConnections/services/list.vue'),
        },
        {
            path: 'manageAPIs',
            name: 'manageAPIs',

            component: () => import('@/map_modules/setting/manageConnections/APIs/list.vue'),
        },

    ]


