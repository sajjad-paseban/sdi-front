import {RouteRecordRaw} from "vue-router";
import {routes as layerInput_route} from '@/map_modules/analyze/addModel/layerInput/router'

export const routes: Array<RouteRecordRaw> = [

    {
        path: 'addModelConfig',
        name: 'addModelConfig',
        component: () => import('@/map_modules/analyze/addModel/addModelConfig.vue'),

    },

    {
        path: 'setModelInput/:inputType/:processName',
        name: 'setModelInput',
        component: () => import('@/map_modules/analyze/addModel/setModelInput.vue'),
        children:[
            {
                path: 'layerInput',
                name: 'layerInput',
                component: () => import('@/map_modules/analyze/addModel/layerInput/layerInput.vue'),
                children:layerInput_route
            },
            {
                path: 'modelInput',
                name: 'modelInput',
                component: () => import('@/map_modules/analyze/addModel/setModelAsModelInput.vue'),
            },

            {
                path: 'numberInput',
                name: 'numberInput',
                component: () => import('@/map_modules/analyze/addModel/setNumberAsModelInput.vue'),
            },

            {
                path: 'modelDrawFeature',
                name:'modelDrawFeatureAdd',
                component: () => import('@/map_modules/mainPage/view.vue'),
                children:[
                    {
                        path:'',
                        name: 'modelDrawFeature',
                        component:()=> import('@/map_modules/analyze/addModel/drawFeatureAsModelInput.vue')
                    }
                ],
                props:{fullScreen:true}
            },
        ]
    },

    {
        path: 'setModelProcess',
        name: 'setModelProcess',
        component: () => import('@/map_modules/analyze/addModel/setModelProcess.vue'),

    },

    {
        path: 'setModelOutput',
        name: 'setModelOutput',
        component: () => import('@/map_modules/analyze/addModel/setModelOutput.vue'),

    },

]