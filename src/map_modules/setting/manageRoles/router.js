export const routes = [
    {
        path: 'list',
        name: 'manageRolesList',
        component: () => import('@/map_modules/setting/manageRoles/list.vue'),
    },
    {
        path: 'addRole',
        name: 'addRole',
        component: () => import('@/map_modules/setting/manageRoles/addRole.vue'),
    },
    {
        path: 'editRole/:data',
        name: 'editRole',
        props: {
            id: {
                data: [Number],
                default: null
            },
        },
        component: () => import('@/map_modules/setting/manageRoles/editRole.vue'),
    },
    {
        path: 'access',
        name: 'access',
        component: () => import('@/map_modules/setting/manageRoles/access.vue'),
    },
    {
        path: 'mapConfig',
        name: 'mapConfig',
        component: () => import('@/map_modules/setting/manageRoles/mapConfig.vue'),
    },
];
//# sourceMappingURL=router.js.map