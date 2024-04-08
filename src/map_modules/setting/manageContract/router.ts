import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'manageContractForm',
            name: 'manageContractForm',

            component: () => import('@/map_modules/setting/manageContract/contractForm.vue'),
        },

    ]


