export const routes = [
    {
        path: 'service',
        name: 'service',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '@/map_modules/layer/addLayer/addLayerByService/service.vue')
    },
];
//# sourceMappingURL=router.js.map