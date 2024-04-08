import {RouteRecordRaw} from "vue-router";



export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'base',
            name: 'baseModelStyles',

            component: () => import( '@/map_modules/layer/modelStyles/base.vue'),
        },

        {
            path: 'label',
            name: 'labelModelStyles',

            component: () => import( '@/map_modules/layer/modelStyles/label.vue'),
        },





    ]


