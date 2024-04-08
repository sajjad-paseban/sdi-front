import {MutationTree} from "vuex";
import {LayerItem, OpenLayer} from "@/store/openLayer/types";
import Map from 'ol/Map.js';
import {BaseMapInterface} from "@/models/BaseMap.interface";
import {GetMapConfigInterface} from "@/models/MapConfig.interface";
import {LayerTree} from "@/models/Layer.Interface";

export enum OpenLayerMutations {
    SET_MAP = 'SET_MAP',
    SET_LAYERS = 'SET_LAYERS',
    SET_ACTIVE_LAYER = 'Set_ACTIVE_LAYER',
    SET_SHOW_LAYERS = 'SET_SHOW_LAYERS',
    SET_ZONE = 'SET_ZONE',
    SET_LAYERS_TREE = 'SET_LAYERS_TREE',
    ALL_MAP_CONFIG_LOAD ='ALL_MAP_CONFIG_LOAD',
    SET_BASE_MAP = 'SET_BASE_MAP',
    SET_MAP_CONFIG = 'SET_MAP_CONFIG',
    SET_LAYERS_SORT = 'SET_LAYERS_SORT',
    SET_CLUSTER_LAYERS='SET_CLUSTER_LAYERS',

    SET_SUB_MAP = 'SET_SUB_MAP',
    SET_SUB_ACTIVE_LAYER = 'Set_SUB_ACTIVE_LAYER',
    SET_SUB_SHOW_LAYERS = 'SET_SUB_SHOW_LAYERS',
    SET_SUB_BASE_MAP = 'SET_SUB_BASE_MAP',
    SET_SUB_CLUSTER_LAYERS='SET_SUB_CLUSTER_LAYERS',
}


export const mutations: MutationTree<OpenLayer> = {

    [OpenLayerMutations.ALL_MAP_CONFIG_LOAD](state, payload: boolean): void {

        state.all_map_config_load = payload
    },

    [OpenLayerMutations.SET_LAYERS_TREE](state, payload: LayerTree[]): void {

        state.layers_tree = payload
    },

    [OpenLayerMutations.SET_MAP](state, payload: Map): void {

        state.map = payload
    },
    [OpenLayerMutations.SET_SUB_MAP](state, payload: Map): void {

        state.sub_map = payload
    },

    [OpenLayerMutations.SET_LAYERS](state, payload: LayerItem[]): void {
        state.layers = payload
    },
    [OpenLayerMutations.SET_ZONE](state, payload: number): void {

        state.zone = payload
    },
    [OpenLayerMutations.SET_ACTIVE_LAYER](state, payload: LayerItem): void {

        state.active_layer = payload
    },
    [OpenLayerMutations.SET_SUB_ACTIVE_LAYER](state, payload: LayerItem): void {

        state.sub_active_layer = payload
    },

    [OpenLayerMutations.SET_SHOW_LAYERS](state, payload: LayerItem[]): void {
        state.show_layers = payload
    },
    [OpenLayerMutations.SET_BASE_MAP](state, payload: BaseMapInterface): void {
        state.active_baseMap = payload
    },

    [OpenLayerMutations.SET_SUB_SHOW_LAYERS](state, payload: LayerItem[]): void {
        state.sub_show_layers = payload
    },
    [OpenLayerMutations.SET_SUB_BASE_MAP](state, payload: BaseMapInterface): void {
        state.sub_active_baseMap = payload
    },

    [OpenLayerMutations.SET_MAP_CONFIG](state, payload: GetMapConfigInterface): void {

        state.mapConfig = {
            center:[payload.centerPointY,payload.centerPointX],
            extend:[[payload.extendBottomX,payload.extendBottomY],[payload.extendTopX,payload.extendTopY]],
            currentZoom:payload.current_zoom,
            maxZoom:payload.max_zoom,
            minZoom:payload.min_zoom
        }
    },

    [OpenLayerMutations.SET_LAYERS_SORT](state, payload: LayerItem[]): void {
        state.sorted_layers = payload
    },

    [OpenLayerMutations.SET_CLUSTER_LAYERS](state, payload: LayerItem[]): void {
        state.cluster_layers = payload
    },
    [OpenLayerMutations.SET_SUB_CLUSTER_LAYERS](state, payload: LayerItem[]): void {
        state.sub_cluster_layers = payload
    },
}

