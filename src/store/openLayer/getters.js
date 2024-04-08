export const getters = {
    getLayersTree(state) {
        return state.layers_tree;
    },
    getAllMapConfigLoad(state) {
        return state.all_map_config_load;
    },
    getMap(state) {
        return state.map;
    },
    getActiveLayer(state) {
        return state.active_layer;
    },
    getLayers(state) {
        return state.layers;
    },
    getShowLayers(state) {
        return state.show_layers;
    },
    getZone(state) {
        return state.zone;
    },
    getActiveBaseMap(state) {
        return state.active_baseMap;
    },
    getMapConfig(state) {
        return state.mapConfig;
    },
    getLayersSort(state) {
        return state.sorted_layers;
    },
    getClusterLayers(state) {
        return state.cluster_layers;
    },
    getSubMap(state) {
        return state.sub_map;
    },
    getSubClusterLayers(state) {
        return state.sub_cluster_layers;
    },
    getSubActiveBaseMap(state) {
        return state.sub_active_baseMap;
    },
    getSubShowLayers(state) {
        return state.sub_show_layers;
    },
    getSubActiveLayer(state) {
        return state.sub_active_layer;
    },
};
//# sourceMappingURL=getters.js.map