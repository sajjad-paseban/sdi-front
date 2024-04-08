export var SurveyMutations;
(function (SurveyMutations) {
    SurveyMutations["SET_DRAW_FEATURE"] = "SET_DRAW_FEATURE";
    SurveyMutations["SET_ACTIVE_DRAW"] = "SET_ACTIVE_DRAW";
    SurveyMutations["SET_LOAD_FROM_SDI"] = "SET_LOAD_FROM_SDI";
    SurveyMutations["SET_SHOW_FEATURES"] = "SET_SHOW_FEATURES";
    SurveyMutations["SET_SURVEY_LAYERS"] = "SET_SURVEY_LAYERS";
    SurveyMutations["SET_CODING_TABLE"] = "SET_CODING_TABLE";
    SurveyMutations["SET_MAP_DISABLE"] = "SET_MAP_DISABLE";
    SurveyMutations["SET_ARSE_INFO"] = "SET_ARSE_INFO";
    SurveyMutations["SET_BUSINESS_UNIT_INFO"] = "SET_BUSINESS_UNIT_INFO";
    SurveyMutations["SET_EDIT_FEATURES"] = "SET_EDIT_FEATURES";
    SurveyMutations["SET_TASKBAR_INFO_OWNER_NAME"] = "SET_TASKBAR_INFO_OWNER_NAME";
    SurveyMutations["SET_TASKBAR_INFO_PANEL_NAME"] = "SET_TASKBAR_INFO_PANEL_NAME";
    SurveyMutations["SET_TASKBAR_INFO_CODE"] = "SET_TASKBAR_INFO_CODE";
    SurveyMutations["SET_TASKBAR_INFO_FEATURES"] = "SET_TASKBAR_INFO_FEATURES";
    SurveyMutations["SET_ARCHIVE_DATA"] = "SET_ARCHIVE_DATA";
    SurveyMutations["SET_MAIN_DIALOG"] = "SET_MAIN_DIALOG";
    SurveyMutations["SET_PANEL_TOPIC"] = "SET_PANEL_TOPIC";
    SurveyMutations["SET_PANEL_USER"] = "SET_PANEL_USER";
    SurveyMutations["SET_CLOSE_DRAW_FEATURE"] = "SET_CLOSE_DRAW_FEATURE";
})(SurveyMutations || (SurveyMutations = {}));
export const mutations = {
    [SurveyMutations.SET_CLOSE_DRAW_FEATURE](state, payload) {
        state.closeDrawFeature = payload;
    },
    [SurveyMutations.SET_PANEL_USER](state, payload) {
        state.panel_user = payload;
    },
    [SurveyMutations.SET_ARCHIVE_DATA](state, payload) {
        state.archiveData = payload;
    },
    [SurveyMutations.SET_PANEL_TOPIC](state, payload) {
        state.panelTopic = payload;
    },
    [SurveyMutations.SET_MAIN_DIALOG](state, payload) {
        state.mainDialog = payload;
    },
    [SurveyMutations.SET_DRAW_FEATURE](state, payload) {
        state.drawFeature = payload;
    },
    [SurveyMutations.SET_TASKBAR_INFO_OWNER_NAME](state, payload) {
        state.taskBarInfo.ownerName = payload;
    },
    [SurveyMutations.SET_TASKBAR_INFO_PANEL_NAME](state, payload) {
        state.taskBarInfo.panelName = payload;
    },
    [SurveyMutations.SET_TASKBAR_INFO_CODE](state, payload) {
        state.taskBarInfo.code = payload;
    },
    [SurveyMutations.SET_TASKBAR_INFO_FEATURES](state, payload) {
        state.taskBarInfo.features = payload;
    },
    [SurveyMutations.SET_BUSINESS_UNIT_INFO](state, payload) {
        state.businessUnitInfo = payload;
    },
    [SurveyMutations.SET_LOAD_FROM_SDI](state, payload) {
        state.loadFromSdi = payload;
    },
    [SurveyMutations.SET_ACTIVE_DRAW](state, payload) {
        state.activeDraw = payload;
    },
    [SurveyMutations.SET_SHOW_FEATURES](state, payload) {
        state.showFeatures = payload;
    },
    [SurveyMutations.SET_EDIT_FEATURES](state, payload) {
        state.editFeatures = payload;
    },
    [SurveyMutations.SET_SURVEY_LAYERS](state, payload) {
        state.survey_layers = payload;
    },
    [SurveyMutations.SET_CODING_TABLE](state, payload) {
        state.coding_table = payload;
    },
    [SurveyMutations.SET_MAP_DISABLE](state, payload) {
        state.mapDisable = payload;
    },
    [SurveyMutations.SET_ARSE_INFO](state, payload) {
        state.arseInfo = payload;
    },
};
//# sourceMappingURL=mutations.js.map