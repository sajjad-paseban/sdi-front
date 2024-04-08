import {Module} from "vuex";
import {RootState} from "@/store/types";
import {getters} from "@/store/openLayer/getters";
import {mutations} from "@/store/openLayer/mutations";
import {actions} from "@/store/openLayer/actions";
import {OpenLayer} from "@/store/openLayer/types";


const state: OpenLayer = {
    map: null,
    zone: null,
    active_layer: null,
    active_baseMap:null,
    layers: [],
    layers_tree:[],
    all_map_config_load:false,
    show_layers:[],
    sorted_layers:[],
    mapConfig:null,
    cluster_layers:[],

    sub_map:null,
    sub_active_layer: null,
    sub_active_baseMap:null,
    sub_show_layers:[],
    sub_cluster_layers:[],
}


export const openLayer: Module<OpenLayer, RootState> = {
    state: state,
    getters: getters,
    mutations: mutations,
    actions: actions
}