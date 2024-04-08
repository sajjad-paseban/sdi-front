import {RouteRecordRaw} from "vue-router";
import {routes as manageRoles_routes} from '@/map_modules/setting/manageRoles/router'
import {routes as manageUsers_routes} from '@/map_modules/setting/manageUsers/router'
import {routes as manageLogs_routes} from '@/map_modules/setting/manageLogs/router'
import {routes as manageIPs_routes} from '@/map_modules/setting/manageIPs/router'
import {routes as manageLoginedUsers_routes} from '@/map_modules/setting/manageLoginedUsers/router'
import {routes as manageContract_routes} from '@/map_modules/setting/manageContract/router'
import {routes as manageConnections_routes} from '@/map_modules/setting/manageConnections/router'
import {routes as backgroundTasks_routes} from '@/map_modules/setting/backgroundTasks/router'
import {routes as manageBaseMaps_routes} from '@/map_modules/setting/manageBaseMaps/router'
import {routes as manageAPIKEYs_routes} from '@/map_modules/setting/manageAPIKEYs/router'
import {routes as manageKorokiModels_routes} from '@/map_modules/setting/manageKorokiModels/router'
import {routes as manageTables_routes} from '@/map_modules/setting/manageTables/router'
import {routes as manageAccess_routes} from '@/map_modules/setting/manageAccess/router'

export const routes: Array<RouteRecordRaw> = [

    {
        path: 'manageRoles',
        name: 'manageRoles',

        component: () => import('@/map_modules/setting/manageRoles/manageRoles.vue'),
        children:manageRoles_routes
    },

    {
        path: 'manageUsers',
        name: 'manageUsers',

        component: () => import('@/map_modules/setting/manageUsers/manageUsers.vue'),
        children:manageUsers_routes
    },

    {
        path: 'manageLogs',
        name: 'manageLogs',

        component: () => import('@/map_modules/setting/manageLogs/manageLogs.vue'),
        children:manageLogs_routes
    },

    {
        path: 'manageIPs',
        name: 'mangageIPs',

        component: () => import('@/map_modules/setting/manageIPs/mangageIPs.vue'),
        children:manageIPs_routes
    },

    {
        path: 'manageLoginedUsers',
        name: 'manageLoginedUsers',

        component: () => import('@/map_modules/setting/manageLoginedUsers/manageLoginedUsers.vue'),
        children:manageLoginedUsers_routes
    },

    {
        path: 'manageContract',
        name: 'manageContract',

        component: () => import('@/map_modules/setting/manageContract/manageContract.vue'),
        children:manageContract_routes
    },

    {
        path: 'manageConnections',
        name: 'manageConnections',

        component: () => import('@/map_modules/setting/manageConnections/manageConnections.vue'),
        children:manageConnections_routes
    },

    {
        path: 'backgroundTasks',
        name: 'backgroundTasks',

        component: () => import('@/map_modules/setting/backgroundTasks/backgroundTasks.vue'),
        children:backgroundTasks_routes
    },

    {
        path: 'manageBaseMaps',
        name: 'manageBaseMaps',

        component: () => import('@/map_modules/setting/manageBaseMaps/manageBaseMaps.vue'),
        children:manageBaseMaps_routes
    },

    {
        path: 'manageAPIKEYs',
        name: 'manageAPIKEYs',

        component: () => import('@/map_modules/setting/manageAPIKEYs/manageAPIKEYs.vue'),
        children:manageAPIKEYs_routes
    },
    {
        path: 'manageKorokiModels',
        name: 'manageKorokiModels',

        component: () => import('@/map_modules/setting/manageKorokiModels/manageKorokiModels.vue'),
        children:manageKorokiModels_routes
    },

    {
        path: 'manageTables',
        name: 'manageTables',

        component: () => import('@/map_modules/setting/manageTables/manageTables.vue'),
        children:manageTables_routes
    },

    {
        path: 'manageAccess',
        name: 'manageAccess',

        component: () => import('@/map_modules/setting/manageAccess/manageAccess.vue'),
        children:manageAccess_routes
    },
]