import { routes as model_group_routes } from "@/map_modules/print/modelGroup/router";
export const routes = [
    {
        path: 'printList',
        name: 'printList',
        component: () => import('@/map_modules/print/List.vue'),
    },
    {
        path: 'addPrint',
        name: 'addPrint',
        component: () => import('@/map_modules/print/add/Add.vue'),
    },
    {
        path: 'makeModel/:model',
        name: 'makeModel',
        component: () => import('@/map_modules/print/add/MakeMode.vue'),
    },
    {
        path: 'preMapModel',
        name: 'preMapModel',
        component: () => import('@/map_modules/print/add/preMakeModel/Map.vue'),
    },
    {
        path: 'editModel/:model/:id',
        name: 'editModel',
        component: () => import('@/map_modules/print/EditModel.vue'),
    },
    {
        path: 'modelGroup',
        name: 'modelGroup',
        component: () => import('@/map_modules/print/modelGroup/modelGroup.vue'),
        children: model_group_routes
    },
];
//# sourceMappingURL=router.js.map