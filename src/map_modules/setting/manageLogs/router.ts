import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageLogsList',

            component: () => import('@/map_modules/setting/manageLogs/list.vue'),
        },

    ]


