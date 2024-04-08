import {RouteRecordRaw} from "vue-router";


export const routes: Array<RouteRecordRaw> = [
    {
        path: 'archive',
        name: 'haffariArchive',
        component: () => import( '@/map_modules/haffari/components/archive/Archive.vue'),
        children: [
            {
                name: 'haffariArchiveList',
                path: '',
                component: () => import( '@/map_modules/haffari/components/archive/List.vue'),
                props: true,
            },
            {
                name: 'haffariArchiveEdit',
                path: 'edit/:id',
                component: () => import( '@/map_modules/haffari/components/archive/Edit.vue'),
                props: true,
            },

            {
                name: 'haffariArchiveAdd',
                path: 'add',
                component: () => import( '@/map_modules/haffari/components/archive/Add.vue'),
                props: true,
            },
        ],
        props: true,
    },
    {
        path: 'info',
        name: 'haffariInfo',
        component: () => import( '@/map_modules/haffari/components/info/Info.vue'),
        props: true
    },
    {
        path: 'settingPages',
        name: 'settingPages',
        component: () => import( '@/map_modules/haffari/components/settingPages/SettingPages.vue'),
        props: true,
        children: [
            {
                name: 'haffariDrawConfig',
                path: 'drawConfig',
                component: () => import( '@/map_modules/haffari/components/settingPages/draw/Draw.vue'),
                children:[
                    {
                        path: 'setting',
                        name: 'haffariDrawSetting',
                        component: () => import( '@/map_modules/haffari/components/settingPages/draw/Setting.vue'),
                        props: true
                    },
                    {
                        path: 'info',
                        name: 'haffariDrawInfo',
                        component: () => import( '@/map_modules/haffari/components/settingPages/draw/Info.vue'),
                        props: true
                    },
                ],
                props: true,
            },
        ]
    }
]