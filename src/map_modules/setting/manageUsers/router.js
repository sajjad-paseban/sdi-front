export const routes = [
    {
        path: 'list',
        name: 'mangeUsersList',
        component: () => import('@/map_modules/setting/manageUsers/list.vue'),
    },
    {
        path: 'addUser',
        name: 'addUser',
        component: () => import('@/map_modules/setting/manageUsers/addUser.vue'),
    },
    {
        path: 'editUser/:data',
        name: 'editUser',
        component: () => import('@/map_modules/setting/manageUsers/editUser.vue'),
    }
];
//# sourceMappingURL=router.js.map