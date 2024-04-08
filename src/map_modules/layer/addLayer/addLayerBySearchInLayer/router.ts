import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [

        {
            path: 'searchLayerConfig',
            name: 'searchLayerConfig',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/addLayerBySearchInLayer/searchLayerConfig.vue')
        },
        {
            path: 'layerStyleConfig/:id/:layer_type',
            name: 'SLlayerStyleConfig',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerStyleConfig.vue')
        },
        {
            path: 'layerMetaData/:id/:layer_type',
            name: 'SLlayerMetaData',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerMetaData.vue')
        },

    ]

