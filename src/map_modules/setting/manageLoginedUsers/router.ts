import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'manageLoginedUsersList',

            component: () => import('@/map_modules/setting/manageLoginedUsers/list.vue'),
        },

    ]


