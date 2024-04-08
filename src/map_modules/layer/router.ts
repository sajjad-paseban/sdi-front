import {RouteRecordRaw} from "vue-router";
import {routes as addLayer_routes} from '@/map_modules/layer/addLayer/router'
import {routes as editLayer_routes} from '@/map_modules/layer/editLayer/router'
import {routes as modelStyles_routes} from '@/map_modules/layer/modelStyles/router'
import {routes as layerGroup_routes} from '@/map_modules/layer/layerGroup/router'
import {routes as layerTools_routes} from '@/map_modules/layer/layerTools/router'


export const routes: Array<RouteRecordRaw> = [
    {
        path: 'addLayer',
        name: 'addLayer',

        component: () => import('@/map_modules/layer/addLayer/addLayer.vue'),
        children: addLayer_routes,

    },
    {
        path: 'editLayer',
        name: 'editLayer',

        component: () => import('@/map_modules/layer/editLayer/editLayer.vue'),
        children: editLayer_routes,
    },
    {
        path: 'deleteLayer/:id?',
        name: 'deleteLayer',

        component: () => import('@/map_modules/layer/deleteLayer/deleteLayer.vue'),

    },
    {
        path: 'modelStyles',
        name: 'modelStyles',

        component: () => import('@/map_modules/layer/modelStyles/modelStyles.vue'),
        children: modelStyles_routes,
    },

    {
        path: 'layerInfo',
        name: 'layerInfo',

        component: () => import('@/map_modules/layer/layerInfo/layerInfo.vue'),
    },

    {
        path: 'layerGroup',
        name: 'layerGroup',

        component: () => import('@/map_modules/layer/layerGroup/layerGroup.vue'),
        children: layerGroup_routes,
    },

    {
        path: 'layerExport',
        name: 'layerExport',

        component: () => import('@/map_modules/layer/layerExport/layerExport.vue'),
    },

    {
        path: 'layerConvert',
        name: 'layerConvert',

        component: () => import('@/map_modules/layer/layerConvert/layerConvert.vue'),
    },

    {
        path: 'layerTools',
        name: 'layerTools',

        component: () => import('@/map_modules/layer/layerTools/LayerTools.vue'),
        children: layerTools_routes,
    },
]