import {GetterTree} from "vuex";
import {RootState} from "@/store/types";
import {LayerItem, MapConfig, OpenLayer} from "@/store/openLayer/types";
import Map from 'ol/Map.js';
import {BaseMapInterface} from "@/models/BaseMap.interface";
import {LayerTree} from "@/models/Layer.Interface";
export const getters: GetterTree<OpenLayer,RootState>={

    getLayersTree(state):LayerTree[]{
        return state.layers_tree
    },

    getAllMapConfigLoad(state):boolean{
        return state.all_map_config_load
    },

    getMap(state):Map|null{
        return state.map
    },

    getActiveLayer(state):LayerItem|null{
        return state.active_layer
    },

    getLayers(state):LayerItem[]|null{
        return  state.layers
    },
    getShowLayers(state):LayerItem[]|null{
        return  state.show_layers
    },
    getZone(state):number|null{
        return  state.zone
    },
    getActiveBaseMap(state):BaseMapInterface|null{
        return  state.active_baseMap
    },
    getMapConfig(state):MapConfig|null{
        return  state.mapConfig
    },
    getLayersSort(state):LayerItem[]{
        return  state.sorted_layers
    },
    getClusterLayers(state):LayerItem[]{
        return  state.cluster_layers
    },

    getSubMap(state):Map|null{
        return state.sub_map
    },
    getSubClusterLayers(state):LayerItem[]{
        return  state.sub_cluster_layers
    },
    getSubActiveBaseMap(state):BaseMapInterface|null{
        return  state.sub_active_baseMap
    },
    getSubShowLayers(state):LayerItem[]|null{
        return  state.sub_show_layers
    },
    getSubActiveLayer(state):LayerItem|null{
        return state.sub_active_layer
    },
}