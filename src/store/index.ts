import {createStore} from 'vuex'
import {RootState} from './types'
import {user} from "@/store/user";
import {RouteLocationNormalized} from "vue-router";


export enum StoreActions {
    SET_REQUEST_LOADING = 'SET_REQUEST_LOADING',

}

import Map from 'ol/Map.js';
import {openLayer} from "@/store/openLayer";
import {survey} from "@/store/survey";

export default createStore<RootState>({
    state: {
        router_access_denied_alert: false,

        confirmDialog: {
            massage: null,
            topic: null,
            accept: () => {
                console.log('accept')
            },
            reject: () => {
                console.log('reject')
            },
            active: false,
            noBtn:{
                color:'primary',
                text:'خیر'
            },
            yesBtn:{
                color:'primary',
                text:'بله'
            }
        },

        requestLoading: {
            simple: false,
            advance: false
        },

        frontUrl: 'http://localhost:8081',
        geoUrl: 'http://localhost:8080/geoserver',
        backendUrl: 'http://localhost:8000',
        layerExportLink: 'http://localhost:8000/files/export_zip/',


    },
    getters: {},
    mutations: {
        set_router_access_denied_alert(state, payload: boolean) {
            state.router_access_denied_alert = payload
        },
        setConfirmDialog(state, payload: { massage: string, topic: string, accept: () => void, reject: () => void, active: boolean }) {
            state.confirmDialog = {...payload}
        },

        setRequestLoading(state, payload: {
            simple: boolean,
            advance: boolean
        }) {
            state.requestLoading = {...payload}
        },
        set_links_init(state, payload: {
            frontUrl: string,
            geoUrl: string,
            backendUrl: string,
            layerExportLink: string
        }) {
            state.frontUrl = payload.frontUrl
            state.geoUrl = payload.geoUrl
            state.backendUrl = payload.backendUrl
            state.layerExportLink = payload.layerExportLink
        }
    },
    actions: {
        [StoreActions.SET_REQUEST_LOADING](context, data: {
            type: 'simple' | 'advance', active: boolean
        }) {
            if (data.type === 'simple') {
                context.commit('setRequestLoading', {simple: data.active, advance: false})
            } else {
                context.commit('setRequestLoading', {advance: data.active, simple: false})
            }
        }
    },
    modules: {
        user, openLayer,survey
    }
})
