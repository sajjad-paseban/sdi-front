export const routes = [
    {
        path: 'addFeature',
        name: 'addFeature',
        props: true,
        component: () => import('@/map_modules/feature/addFeature/addFeature.vue'),
    },
    {
        path: 'editFeature',
        name: 'editFeature',
        props: true,
        component: () => import('@/map_modules/feature/editFeature/editFeature.vue'),
    },
    {
        path: 'deleteFeature',
        name: 'deleteFeature',
        props: true,
        component: () => import('@/map_modules/feature/deleteFeature/deleteFeature.vue'),
    },
];
//# sourceMappingURL=router.js.map