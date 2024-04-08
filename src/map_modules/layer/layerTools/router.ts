import {RouteRecordRaw} from "vue-router";



export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'mergeLayers',
            name: 'mergeLayers',

            component: () => import( '@/map_modules/layer/layerTools/merge/Merge.vue'),
        },







    ]


