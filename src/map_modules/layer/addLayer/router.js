import { routes as addLayerByFile_routes } from '@/map_modules/layer/addLayer/addLayerByFile/router';
import { routes as addEmptyLayer_routes } from '@/map_modules/layer/addLayer/addEmptyLayer/router';
import { routes as addLayerBySearchInLayer_routes } from '@/map_modules/layer/addLayer/addLayerBySearchInLayer/router';
import { routes as addLayerBySearchInDatabase_routes } from '@/map_modules/layer/addLayer/addLayerBySearchInDatabase/router';
import { routes as addLayerByService_routes } from '@/map_modules/layer/addLayer/addLayerByService/router';
export const routes = [
    {
        path: 'addLayerByFile',
        name: 'addLayerByFile',
        component: () => import('@/map_modules/layer/addLayer/addLayerByFile/addLayerByFile.vue'),
        children: addLayerByFile_routes
    },
    {
        path: 'addEmptyLayer',
        name: 'addEmptyLayer',
        component: () => import('@/map_modules/layer/addLayer/addEmptyLayer/addEmptyLayer.vue'),
        children: addEmptyLayer_routes
    },
    {
        path: 'addLayerBySearchInLayer',
        name: 'addLayerBySearchInLayer',
        component: () => import('@/map_modules/layer/addLayer/addLayerBySearchInLayer/addLayerBySearchInLayer.vue'),
        children: addLayerBySearchInLayer_routes
    },
    {
        path: 'addLayerBySearchInDatabase',
        name: 'addLayerBySearchInDatabase',
        component: () => import('@/map_modules/layer/addLayer/addLayerBySearchInDatabase/addLayerBySearchInDatabase.vue'),
        children: addLayerBySearchInDatabase_routes
    },
    {
        path: 'addLayerByService',
        name: 'addLayerByService',
        component: () => import('@/map_modules/layer/addLayer/addLayerByService/addLayerByService.vue'),
        children: addLayerByService_routes
    },
];
//# sourceMappingURL=router.js.map