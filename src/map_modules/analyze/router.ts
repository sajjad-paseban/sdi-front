import {RouteRecordRaw} from "vue-router";

import {routes as add_model_router} from '@/map_modules/analyze/addModel/router'

export const routes: Array<RouteRecordRaw> = [
    {
        path: 'analyzeModelsList',
        name: 'analyzeModelsList',
        component: () => import('@/map_modules/analyze/modelsList.vue'),
    },

    {
        path: 'addModel',
        name: 'addModel',
        component: () => import('@/map_modules/analyze/addModel/addModel.vue'),
        children:add_model_router
    },

    {
        path: 'runAnalyze/:id',
        name: 'runAnalyze',
        component: () => import('@/map_modules/analyze/runAnalyze/runAnalyze.vue'),
    },

]