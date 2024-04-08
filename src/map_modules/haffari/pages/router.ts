import {RouteRecordRaw} from "vue-router";


export const routes: Array<RouteRecordRaw> = [
    {
        path: 'draw',
        name: 'drawHaffari',
        component: () => import( '@/map_modules/haffari/pages/draw/drawFeature.vue'),
        props: true,
    },

]