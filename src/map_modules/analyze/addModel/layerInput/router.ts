import {RouteRecordRaw} from "vue-router";


export const routes: Array<RouteRecordRaw> = [


    {
        path: 'selectLayer',
        name: 'selectLayer',
        component: () => import('@/map_modules/analyze/addModel/layerInput/selectLayer.vue'),

    },

    {
        path: 'featuresFilter',
        name: 'featuresFilter',
        component: () => import('@/map_modules/analyze/addModel/layerInput/featuresFilter.vue'),
        children:[
            {
                path: 'modelDrawFeature',
                name:'modelDrawFeatureLayerInput',
                component: () => import('@/map_modules/mainPage/view.vue'),
                children:[
                    {
                        path:'',
                        name: 'featuresFilterDrawFeature',
                        component:()=> import('@/map_modules/analyze/addModel/drawFeatureAsModelInput.vue')
                    }
                ],
                props:{fullScreen:true}
            },
            {
                path: 'selectFilterFeature',
                name:'selectFilterFeatureName',
                component: () => import('@/map_modules/mainPage/view.vue'),
                children:[
                    {
                        path:':searchLayer',
                        name: 'selectFilterFeature',
                        component:()=> import('@/map_modules/analyze/addModel/layerInput/drawFilterFeatureToolbar.vue'),
                        props: route => ({ searchLayer_id: parseInt(String(route.params.searchLayer)) })
                    }
                ],
                props:{fullScreen:true}
            },
        ]

    },
    {
        path: 'filterResult',
        name: 'filterResult',
        component: () => import('@/map_modules/analyze/addModel/layerInput/filterResult.vue'),

    },

]