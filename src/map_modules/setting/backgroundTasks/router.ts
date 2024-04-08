import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'backup',
            name: 'backup',

            component: () => import('@/map_modules/setting/backgroundTasks/backup.vue'),
        },

    ]


