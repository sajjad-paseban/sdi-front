import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageBaseMapList',

            component: () => import('@/map_modules/setting/manageBaseMaps/list.vue'),
        },
        {
            path: 'addBaseMap',
            name: 'addBaseMap',

            component: () => import('@/map_modules/setting/manageBaseMaps/addBaseMap.vue'),
        },

        {
            path: 'editBaseMap/:data',
            name: 'editBaseMap',

            component: () => import('@/map_modules/setting/manageBaseMaps/editBaseMap.vue'),
        },

    ]


