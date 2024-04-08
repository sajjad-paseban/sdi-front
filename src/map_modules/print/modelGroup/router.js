export const routes = [
    {
        path: 'list',
        name: 'groupModelList',
        component: () => import('@/map_modules/print/modelGroup/list.vue'),
    },
    {
        path: 'addModelGroup',
        name: 'addModelGroup',
        component: () => import('@/map_modules/print/modelGroup/add.vue'),
    },
    {
        path: 'editModelGroup/:data',
        name: 'editModelGroup',
        component: () => import('@/map_modules/print/modelGroup/edit.vue'),
    }
];
//# sourceMappingURL=router.js.map