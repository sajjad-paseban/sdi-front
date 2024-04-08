export const routes = [
    {
        path: 'layerConfig',
        name: 'SDlayerConfig',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/addLayerBySearchInDatabase/searchLayerConfig.vue')
    },
    {
        path: 'layerStyleConfig/:id/:layer_type',
        name: 'SDlayerStyleConfig',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerStyleConfig.vue')
    },
    {
        path: 'layerMetaData/:id/:layer_type',
        name: 'SDlayerMetaData',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/common/layerMetaData.vue')
    },
];
//# sourceMappingURL=router.js.map