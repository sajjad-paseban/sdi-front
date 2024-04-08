import { createStore } from 'vuex';
import { user } from "@/store/user";
export var StoreActions;
(function (StoreActions) {
    StoreActions["SET_REQUEST_LOADING"] = "SET_REQUEST_LOADING";
})(StoreActions || (StoreActions = {}));
import { openLayer } from "@/store/openLayer";
import { survey } from "@/store/survey";
export default createStore({
    state: {
        router_access_denied_alert: false,
        confirmDialog: {
            massage: null,
            topic: null,
            accept: () => {
                console.log('accept');
            },
            reject: () => {
                console.log('reject');
            },
            active: false,
            noBtn: {
                color: 'primary',
                text: 'خیر'
            },
            yesBtn: {
                color: 'primary',
                text: 'بله'
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
        set_router_access_denied_alert(state, payload) {
            state.router_access_denied_alert = payload;
        },
        setConfirmDialog(state, payload) {
            state.confirmDialog = { ...payload };
        },
        setRequestLoading(state, payload) {
            state.requestLoading = { ...payload };
        },
        set_links_init(state, payload) {
            state.frontUrl = payload.frontUrl;
            state.geoUrl = payload.geoUrl;
            state.backendUrl = payload.backendUrl;
            state.layerExportLink = payload.layerExportLink;
        }
    },
    actions: {
        [StoreActions.SET_REQUEST_LOADING](context, data) {
            if (data.type === 'simple') {
                context.commit('setRequestLoading', { simple: data.active, advance: false });
            }
            else {
                context.commit('setRequestLoading', { advance: data.active, simple: false });
            }
        }
    },
    modules: {
        user, openLayer, survey
    }
});
//# sourceMappingURL=index.js.map