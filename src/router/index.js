import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import { routes as print_routes } from '@/map_modules/print/router';
const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView.vue'),
        children: [
            {
                path: 'print',
                name: 'print',
                component: () => import('@/map_modules/print/Print.vue'),
                props: true,
                children: print_routes
            },
        ],
    },
];
const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
//# sourceMappingURL=index.js.map