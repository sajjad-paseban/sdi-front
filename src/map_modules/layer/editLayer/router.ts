import {RouteRecordRaw} from "vue-router";



export const routes: Array<RouteRecordRaw> =
    [
        {
            path: 'editLayerConfig/:id',
            name: 'editLayerConfig',

            component: () => import( '@/map_modules/layer/editLayer/layerConfig.vue'),

        },

        {
            path: 'editWmsLayerConfig/:id',
            name: 'editWmsLayerConfig',

            component: () => import( '@/map_modules/layer/editLayer/wmsLayerConfig.vue'),

        },
        {
            path: 'editLayerStyle/:id/:layer_type',
            name: 'editLayerStyle',

            component: () => import( '@/map_modules/layer/editLayer/layerStyleConfig.vue'),

        },
        {
            path: 'editLayerMeta/:id/:layer_type',
            name: 'editLayerMeta',

            component: () => import( '@/map_modules/layer/editLayer/layerMetaData.vue'),

        },


    ]


