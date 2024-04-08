export var OpenLayerMutations;
(function (OpenLayerMutations) {
    OpenLayerMutations["SET_MAP"] = "SET_MAP";
    OpenLayerMutations["SET_LAYERS"] = "SET_LAYERS";
    OpenLayerMutations["SET_ACTIVE_LAYER"] = "Set_ACTIVE_LAYER";
    OpenLayerMutations["SET_SHOW_LAYERS"] = "SET_SHOW_LAYERS";
    OpenLayerMutations["SET_ZONE"] = "SET_ZONE";
    OpenLayerMutations["SET_LAYERS_TREE"] = "SET_LAYERS_TREE";
    OpenLayerMutations["ALL_MAP_CONFIG_LOAD"] = "ALL_MAP_CONFIG_LOAD";
    OpenLayerMutations["SET_BASE_MAP"] = "SET_BASE_MAP";
    OpenLayerMutations["SET_MAP_CONFIG"] = "SET_MAP_CONFIG";
    OpenLayerMutations["SET_LAYERS_SORT"] = "SET_LAYERS_SORT";
    OpenLayerMutations["SET_CLUSTER_LAYERS"] = "SET_CLUSTER_LAYERS";
    OpenLayerMutations["SET_SUB_MAP"] = "SET_SUB_MAP";
    OpenLayerMutations["SET_SUB_ACTIVE_LAYER"] = "Set_SUB_ACTIVE_LAYER";
    OpenLayerMutations["SET_SUB_SHOW_LAYERS"] = "SET_SUB_SHOW_LAYERS";
    OpenLayerMutations["SET_SUB_BASE_MAP"] = "SET_SUB_BASE_MAP";
    OpenLayerMutations["SET_SUB_CLUSTER_LAYERS"] = "SET_SUB_CLUSTER_LAYERS";
})(OpenLayerMutations || (OpenLayerMutations = {}));
export const mutations = {
    [OpenLayerMutations.ALL_MAP_CONFIG_LOAD](state, payload) {
        state.all_map_config_load = payload;
    },
    [OpenLayerMutations.SET_LAYERS_TREE](state, payload) {
        state.layers_tree = payload;
    },
    [OpenLayerMutations.SET_MAP](state, payload) {
        state.map = payload;
    },
    [OpenLayerMutations.SET_SUB_MAP](state, payload) {
        state.sub_map = payload;
    },
    [OpenLayerMutations.SET_LAYERS](state, payload) {
        state.layers = payload;
    },
    [OpenLayerMutations.SET_ZONE](state, payload) {
        state.zone = payload;
    },
    [OpenLayerMutations.SET_ACTIVE_LAYER](state, payload) {
        state.active_layer = payload;
    },
    [OpenLayerMutations.SET_SUB_ACTIVE_LAYER](state, payload) {
        state.sub_active_layer = payload;
    },
    [OpenLayerMutations.SET_SHOW_LAYERS](state, payload) {
        state.show_layers = payload;
    },
    [OpenLayerMutations.SET_BASE_MAP](state, payload) {
        state.active_baseMap = payload;
    },
    [OpenLayerMutations.SET_SUB_SHOW_LAYERS](state, payload) {
        state.sub_show_layers = payload;
    },
    [OpenLayerMutations.SET_SUB_BASE_MAP](state, payload) {
        state.sub_active_baseMap = payload;
    },
    [OpenLayerMutations.SET_MAP_CONFIG](state, payload) {
        state.mapConfig = {
            center: [payload.centerPointY, payload.centerPointX],
            extend: [[payload.extendBottomX, payload.extendBottomY], [payload.extendTopX, payload.extendTopY]],
            currentZoom: payload.current_zoom,
            maxZoom: payload.max_zoom,
            minZoom: payload.min_zoom
        };
    },
    [OpenLayerMutations.SET_LAYERS_SORT](state, payload) {
        state.sorted_layers = payload;
    },
    [OpenLayerMutations.SET_CLUSTER_LAYERS](state, payload) {
        state.cluster_layers = payload;
    },
    [OpenLayerMutations.SET_SUB_CLUSTER_LAYERS](state, payload) {
        state.sub_cluster_layers = payload;
    },
};
//# sourceMappingURL=mutations.js.map