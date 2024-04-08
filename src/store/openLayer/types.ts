
import Map from 'ol/Map.js';
import {Layer_types, LayerTree} from "@/models/Layer.Interface";
import {LayerGroupInterface} from "@/models/LayerGroup.interface";
import {ServiceInterface} from "@/models/Conncections.interface";
import {BaseMapInterface} from "@/models/BaseMap.interface";



export interface LayerItem {
    id:number,
    name: string,
    type_layer: Layer_types,
    imported_type: string,
    bbox: string,
    code: string|null,
    crs:string,
    table_name: string|null,
    layer_group: LayerGroupInterface,
    service_profile:ServiceInterface|null

}

export interface MapConfig {
    center:[number,number]
    extend:[[number,number],[number,number]]
    maxZoom :number
    minZoom :number
    currentZoom:number
}

export interface OpenLayer {
    map:Map|null
    zone:number|null
    active_layer:LayerItem|null
    layers:LayerItem[]
    layers_tree:LayerTree[]
    all_map_config_load:boolean,
    sorted_layers:LayerItem[]
    show_layers:LayerItem[],
    active_baseMap:BaseMapInterface|null
    mapConfig:MapConfig|null
    cluster_layers:LayerItem[],

    sub_map:Map|null
    sub_active_layer:LayerItem|null
    sub_show_layers:LayerItem[],
    sub_active_baseMap:BaseMapInterface|null
    sub_cluster_layers:LayerItem[],
}