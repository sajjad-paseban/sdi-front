export const routes = [
    {
        path: 'draw',
        name: 'searchDraw',
        props: true,
        component: () => import('@/map_modules/search/searchDraw.vue'),
    },
    {
        path: 'metadata',
        name: 'searchMetadata',
        props: true,
        component: () => import('@/map_modules/search/searchMetadata.vue'),
    },
    {
        path: 'fast',
        name: 'SearchFast',
        props: true,
        component: () => import('@/map_modules/search/searchFast.vue'),
    },
];
//# sourceMappingURL=router.js.map