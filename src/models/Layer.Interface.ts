import {resultSimpleLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleLayerSearch.sd";
import {resultSimpleDatabaseLayerSearchSd} from "@/api/layer/SD.Models/resultSimpleDatabaseLayerSearch.sd";
import {ListStyles} from "@/models/Style.interface";

export interface LayerInterface {

    layer_name: string,
    layer_code: string | null,
    layer_group_id: number,
    type: LAYER_FILE_FORMAT,
    file: File,
    layer_type?: Layer_types

}

export interface LayerRetrieve {
    id: number
    name: string
    type_layer: string,
    code: string | null
    layer_group: {
        id: number,
        name: string
    },
    imported_type: string,
    service_profile: Record<string, any> | null
}

export interface EmptyLayerInterface {

    layer_name: string,
    layer_code: string | null,
    layer_group_id: number,
    layer_type: Layer_types
}

export interface SearchInLayerInterface {

    layer_name: string,
    layer_code: string | null,
    layer_group_id: number,
    layer_data: resultSimpleLayerSearchSd

}

export interface ServiceLayerInterface {

    layer_name: string,
    layer_code: string | null,
    layer_group_id: number,
    layer_type: string,
    service_id: number

}

export interface SearchInDatabaseLayerInterface {

    layer_name: string,
    layer_code: string | null,
    layer_group_id: number,
    layer_data: resultSimpleDatabaseLayerSearchSd

}

export enum LAYER_FILE_FORMAT {
    SHP = 'shp',
    KML = 'kml',
    KMZ = 'kmz',
    TIFF = 'tiff',
    DNF = 'dnf',
    GDB = 'gdb',
    DWG = 'dwg',
    JSON = 'geojson'

}

export enum Layer_types {
    Polygon = "Polygon",
    Line = 'LineString',
    Point = "Point",
    MultiPolygon = 'MultiPolygon',
    MultiPoint = 'MultiPoint',
    MultiLine = 'MultiLineString',
    TIFF = 'Tiff',
    Circle = 'Circle',
}

export interface LayerInfo {
    name: string
    created_at: string
    type_layer: string
    features_length: number
    projection: string
    imported_type: string
}

export interface LayerTree {
    id: number,
    name: string,
    image: string | null
    is_service?: boolean
    is_point?: boolean
    cluster?:boolean
    layers?: LayerTree[] | null
    children?: LayerTree[] | null
    opacity?:number|null

}

export interface ResponseLayerUpload {
    id: number,
    name: string,
    type_layer: Layer_types
}

export interface LayerFields {
    id: number
    name: string,
    p_topic: string | null,
    e_topic: string,
    type: any,
    text_model_style: number | null,
    advance_model_style: number | null,
    is_required: boolean,
    is_geometry: boolean,
    is_active: boolean,
    active_label: boolean,
    is_unique: boolean,
    layer_field_choices: string[] | null
}

export enum LayerFieldTypes {
    Int = 'int',
    String = 'String',
    Geometry = 'geometry',
    Boolean = 'bool',
    Choice = 'choice',
    Date = 'date',
    Time = "time",
    DateTime = 'datetime',
    Float = 'float',
    Binary = 'binary',
    List = "list",
}

export interface LayerDatabaseInfo {
    table_name: string
    database_id: number

}

export interface LayerStyles {
    id: number
    styles: ListStyles[]

}



export interface ActiveLayerFields {
    id:number,
    name:string,
    type:LayerFieldTypes,
    is_required:boolean,
    e_topic:string,
    p_topic:string|null
    layer_field_choices:string[]|null
}