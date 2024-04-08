import {RouteRecordRaw} from "vue-router";

export const routes: Array<RouteRecordRaw> =
    [

        {
            path: 'layerConfig',
            name: 'emptyLayerConfig',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerConfig.vue')
        },
        {
            path: 'layerStyleConfig/:id/:layer_type',
            name: 'emptyLayerStyleConfig',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerStyleConfig.vue')
        },
        {
            path: 'layerMetaData/:id/:layer_type',
            name: 'emptyLayerMetaData',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerMetaData.vue')
        },

    ]


