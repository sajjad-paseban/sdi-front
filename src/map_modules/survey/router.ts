import {RouteRecordRaw} from "vue-router";

import {routes as add_model_router} from '@/map_modules/analyze/addModel/router'

export const routes: Array<RouteRecordRaw> = [
    {
        path: 'measurement',
        name: 'surveyMeasurement',
        component: () => import( '@/map_modules/measurement/Measurement.vue'),
        props: true,

    },

    {
        path: 'selectMap/:id?',
        name: 'selectMap',
        components: {
            default: () => import( '@/map_modules/survey/components/mapComponents/selectFromMap.vue'),
        },
        props: {fullScreen: true}

    },

    {
        path: 'Arse/:code?/:id?',
        name: 'Arse',
        components: {
            form: () => import( '@/map_modules/survey/components/arse/Arse.vue'),

        },
        props:true,

    },

    {
        path: 'building',
        name: 'building',
        components: {
            form: () => import( '@/map_modules/survey/components/building/Building.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },
        children: [
            {
                path: 'archive',
                name: 'buildingArchive',
                component: () => import( '@/map_modules/survey/components/archive/Archive.vue'),
                children: [
                    {
                        name: 'buildingArchiveList',
                        path: '',
                        component: () => import( '@/map_modules/survey/components/archive/List.vue'),
                        props: true,
                    },
                    {
                        name: 'buildingArchiveEdit',
                        path: 'edit/:id',
                        component: () => import( '@/map_modules/survey/components/archive/Edit.vue'),
                        props: true,
                    },

                    {
                        name: 'buildingArchiveAdd',
                        path: 'add',
                        component: () => import( '@/map_modules/survey/components/archive/Add.vue'),
                        props: true,
                    },
                ],
                props: true,
            },
        ],
        props: true,
    },

    {
        path: 'job',
        name: 'job',
        components: {
            form: () => import( '@/map_modules/survey/components/job/Job.vue'),
        },
        children: [
            {
                path: '',
                name: 'jobList',
                component: () => import( '@/map_modules/survey/components/job/List.vue'),
                props: true,
            },

            {
                path: 'add',
                name: 'addJob',
                component: () =>  import( '@/map_modules/survey/components/job/Add.vue'),
                props: true,
            },
            {
                path: 'edit/:code',
                name: 'editJob',
                component: () => import( '@/map_modules/survey/components/job/edit/Edit.vue'),
                children: [
                    {
                        path: 'archive',
                        name: 'jobArchive',
                        component: () => import( '@/map_modules/survey/components/archive/Archive.vue'),
                        children: [
                            {
                                name: 'jobArchiveList',
                                path: '',
                                component: () => import( '@/map_modules/survey/components/archive/List.vue'),
                                props: true,
                            },
                            {
                                name: 'jobArchiveEdit',
                                path: 'edit/:id',
                                component: () => import( '@/map_modules/survey/components/archive/Edit.vue'),
                                props: true,
                            },

                            {
                                name: 'jobArchiveAdd',
                                path: 'add',
                                component: () => import( '@/map_modules/survey/components/archive/Add.vue'),
                                props: true,
                            },
                        ],
                        props: true,
                    },
                ],
                props: true,
            },
        ],
        props: true,
    },

    {
        path: 'archive',
        name: 'archive',
        components: {
            form: () => import( '@/map_modules/survey/components/archive/Archive.vue'),
        },
        children: [
            {
                path: '',
                name: 'archiveList',
                component: () => import( '@/map_modules/survey/components/archive/List.vue'),
                props: true,
            },
            {
                path: 'edit/:id',
                name: 'archiveEdit',
                component: () => import( '@/map_modules/survey/components/archive/Edit.vue'),
                props: true,
            },

            {
                path: 'add',
                name: 'archiveAdd',
                component: () => import( '@/map_modules/survey/components/archive/Add.vue'),
                props: true,
            },
        ],
        props: true,
    },

    {
        path: 'apartemanList',
        name: 'apartemanList',
        components: {
            form: () =>import( '@/map_modules/survey/components/aparteman/ApartemanList.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },

        props: true,
    },

    {
        path: 'apartemanConfig/:idNumber',
        name: 'apartemanConfig',
        components: {
            form: () =>import( '@/map_modules/survey/components/aparteman/apartemanConfig/ApartemanConfig.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },
        children: [
            {
                path: 'archive',
                name: 'apartemanArchive',
                component: () => import( '@/map_modules/survey/components/archive/Archive.vue'),
                children: [
                    {
                        name: 'apartemanArchiveList',
                        path: '',
                        component: () => import( '@/map_modules/survey/components/archive/List.vue'),
                        props: true,
                    },
                    {
                        name: 'apartemanArchiveEdit',
                        path: 'edit/:id',
                        component: () => import( '@/map_modules/survey/components/archive/Edit.vue'),
                        props: true,
                    },

                    {
                        name: 'apartemanArchiveAdd',
                        path: 'add',
                        component: () => import( '@/map_modules/survey/components/archive/Add.vue'),
                        props: true,
                    },
                ],
                props: true,
            },
        ],
    },


    {
        path: 'drawApartemanConfig/:layer',
        name: 'drawApartemanConfig',
        components: {
            form: () =>import( '@/map_modules/survey/components/aparteman/apartemanConfig/ApartemanConfig.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/drawFeature.vue'),
        },
        props: true,
    },

    {
        path: 'floor',
        name: 'floor',
        components: {
            form: () => import( '@/map_modules/survey/components/floor/Floor.vue'),
        },
        props: true,
    },

    {
        path: 'showFloorFeature',
        name: 'showFloorFeature',
        components: {
            form: () => import( '@/map_modules/survey/components/floor/Floor.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },
        props: true,
    },

    {
        path: 'drawArseFeature/:layer',
        name: 'drawArseFeature',
        components: {
            form: () => import( '@/map_modules/survey/components/arse/Arse.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/drawFeature.vue'),
        },
        props: true,
    },

    {
        path: 'showArseFeature',
        name: 'showArseFeature',
        components: {
            form: () => import( '@/map_modules/survey/components/arse/Arse.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },
        props: true,
    },

    {
        path: 'drawBuildingFeature/:layer',
        name: 'drawBuildingFeature',
        components: {
            form: () => import( '@/map_modules/survey/components/building/Building.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/drawFeature.vue'),
        },
        props: true,
    },

    {
        path: 'showBuildingFeature',
        name: 'showBuildingFeature',
        components: {
            form: () => import( '@/map_modules/survey/components/building/Building.vue'),
            default: () => import( '@/map_modules/survey/components/mapComponents/showFeatures.vue'),
        },
        props: true,
    },
]