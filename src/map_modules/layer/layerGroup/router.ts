import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'list',
            name: 'groupLayerList',

            component: () => import('@/map_modules/layer/layerGroup/list.vue'),
        },
        {
            path: 'addLayerGroup',
            name: 'addLayerGroup',

            component: () => import('@/map_modules/layer/layerGroup/add.vue'),
        },
        {
            path: 'editGroup/:data',
            name: 'editGroup',

            component: () => import('@/map_modules/layer/layerGroup/edit.vue'),
        }
    ]


