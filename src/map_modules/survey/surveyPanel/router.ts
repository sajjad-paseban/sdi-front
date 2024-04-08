import {RouteRecordRaw} from "vue-router";

import {routes as add_model_router} from '@/map_modules/analyze/addModel/router'

export const routes: Array<RouteRecordRaw> = [

    {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/Dashboard.vue'),
        children: [
            {
                path: 'allUsersList',
                name: 'allUsersList',
                component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/AllUsersList.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'allUsersListChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]

            },

            {
                path: 'allUserExtentsList/:id?/:name?',
                name: 'allUserExtentsList',
                component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/AllUserExtentsList.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'allUserExtentsListChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]

            },

            {
                path: 'allCheckerExtentsList/:id?/:name?',
                name: 'allCheckerExtentsList',
                component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/AllCheckerExtentsList.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'allCheckerExtentsListChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]

            },

            {
                path: 'surveyProcessMelks/:id?/:code?/:name?',
                name: 'surveyProcessMelks',
                component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/SurveyProcessMelks.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'surveyProcessMelksChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]
            },

            {
                path: 'checkerProcessMelks/:id?/:code?/:name?',
                name: 'checkerProcessMelks',
                component :() => import( '@/map_modules/survey/surveyPanel/components/dashboard/CheckerProcessMelks.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'checkerProcessMelksChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]
            },

            {
                path: 'surveyProcessList',
                name: 'surveyProcessList',
                component:() => import( '@/map_modules/survey/surveyPanel/components/process/ProcessList.vue'),
                children: [
                    {
                        path: 'showChart',
                        name: 'surveyProcessListChart',
                        component: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
                        props: true
                    },
                ]
            },

            {
                path: 'processMelks/:id?',
                name: 'processMelks',
                component :() => import( '@/map_modules/survey/surveyPanel/components/process/processMelks.vue'),
            },
        ]
    },

    {
        path: 'userConfig',
        name: 'userConfig',
        component: () => import( '@/map_modules/survey/surveyPanel/components/users/UserConfig.vue'),

    },

    {
        path: 'showChart',
        name: 'showChart',
        components: {
            form: () => import( '@/map_modules/survey/surveyPanel/components/dashboard/ShowChart.vue'),
        },

    },

    {
        path: 'addProcess/:id?',
        name: 'addProcess',
        component: () => import( '@/map_modules/survey/surveyPanel/components/process/addProcess/AddProcess.vue'),
        children: [
            {
                path: 'selectWorker',
                name: 'selectWorker',
                component: () => import( '@/map_modules/survey/surveyPanel/components/process/addProcess/SelectWorker.vue'),
            },
            {
                path: 'selectChecker',
                name: 'selectChecker',
                component: () => import( '@/map_modules/survey/surveyPanel/components/process/addProcess/SelectChecker.vue'),
            },
            {
                path: 'drawRegion/:layer',
                name: 'drawRegion',
                component: () => import( '@/map_modules/survey/components/mapComponents/drawFeature.vue'),
                props:true
            },
            {
                path: 'processConfig',
                name: 'processConfig',
                component: () => import( '@/map_modules/survey/surveyPanel/components/process/addProcess/ProcessConfig.vue'),
                props:false
            },

        ]

    },


]