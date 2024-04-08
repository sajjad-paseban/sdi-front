import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageModelsList',

            component: () => import('@/map_modules/setting/manageKorokiModels/list.vue'),
        },


    ]


