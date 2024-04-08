import {Module} from "vuex";
import {RootState} from "@/store/types";

import {Survey, TaskbarInfo} from "@/store/survey/types";
import {getters} from "@/store/survey/getters";
import {mutations} from "@/store/survey/mutations";
import {actions} from "@/store/survey/actions";


const state: Survey = {
    drawFeature: null,
    activeDraw: true,
    showFeatures: [],

    loadFromSdi: true,

    editFeatures: [],

    survey_layers: [],
    coding_table: [],

    mapDisable: false,

    arseInfo: null,
    businessUnitInfo: null,

    taskBarInfo: {
        ownerName: null,
        panelName: null,
        code: null,
        features: [],
    },
    panel_user:null,

    archiveData:null,

    mainDialog:null,
    panelTopic:'',

    closeDrawFeature:false
}


export const survey: Module<Survey, RootState> = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}