export const routes = [
    {
        path: 'list',
        name: 'manageBaseMapList',
        component: () => import('@/map_modules/setting/manageBaseMaps/list.vue'),
    },
    {
        path: 'addBaseMap',
        name: 'addBaseMap',
        component: () => import('@/map_modules/setting/manageBaseMaps/addBaseMap.vue'),
    },
    {
        path: 'editBaseMap/:data',
        name: 'editBaseMap',
        component: () => import('@/map_modules/setting/manageBaseMaps/editBaseMap.vue'),
    },
];
//# sourceMappingURL=router.js.map