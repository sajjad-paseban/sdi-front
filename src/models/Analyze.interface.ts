import {LayerItem} from "@/store/openLayer/types";
import {LayerFields} from "@/models/Layer.Interface";

export interface AnalyzeListItem {
    id: number,
    name: string,
    export_type: AnalyzeExportType,
    export_file_type: AnalyzeExportFileType | null,
    des: string,
    group: AnalyzeGroup,
    process: ProcessItem
}

export enum AnalyzeExportType {
    File = "File",
    Exel = 'Exel',
    Json = 'Json',
    InputModel = 'InputModel',
}

export enum AnalyzeExportFileType {
    Json = "Json",
    Shp = 'Shp',
    Kml = 'Kml',
}

export enum ProcessInput {
    Features = "Features",
    FeaturesAndFeature = 'FeaturesAndFeature',
    FeaturesAndNumber = 'FeaturesAndNumber'
}

export enum ProcessInputInputType {
    Layer = "Layer",
    Model = 'Model',
    Api = 'Api',
    Number = 'Number',
    Feature = 'Feature'
}

export enum ProcessOutput {
    Number = "Number",
    String = 'String',
    Geometry = 'Geometry',
    Boolean = 'Boolean',
}

export interface ProcessItem {
    id: number,
    name: string,
    p_name: string,
    input_type: ProcessInput,
    output_type: ProcessOutput,
    function_name: string,
    des: string
}

export interface AnalyzeGroup {
    id: number,
    name: string
}

export interface AnalyzeConfig {
    name: string,
    des: string,
    group_id: number

}

export interface ModelInput {
    topic: string,
    type: string,
    addType: ProcessInputInputType,
    value: any
}


export enum ModelExportTypeEnums {
    File = "File",
    Exel = 'Exel',
    Json = 'Json',
    InputModel = 'InputModel',
}

export enum ModelFileExportTypeEnums {
    Json = "Json",
    Shp = 'Shp',
    Kml = 'Kml',
}

export interface ModelExport {
    type:string,
    file_type:ModelFileExportTypeEnums|null
}

export interface AddAnalyze {
    config: AnalyzeConfig | null,
    process: ProcessItem | null,
    inputs:ModelInput[]
    export_type:ModelExport|null
}

export interface LayerInputFilters {
    layer_id: number | null,
    field: LayerFields | null,
    filter: AnalyzeFilter | null,
    filter_value: any
}

export interface LayerInputData {
    layers: LayerItem[],
    filters?:LayerInputFilters[]
}

export interface AnalyzeFilter {
    id: number
    name: string
    start_condition_value: string
    end_condition_value: string
    p_name: string
    filter_type: FilterTypes,
    condition_input_type: ConditionInputTypes,
    condition: string,
    des: string | null

}

export enum FilterTypes {
    String = "String",
    Date = 'Date',
    Boolean = "Boolean",
    Geometry = 'Geometry',
    Float = 'Float',
}

export enum ConditionInputTypes {
    String = "String",
    Date = 'Date',
    Boolean = "Boolean",
    List = 'List',
    Geometry = 'Geometry',
    Float = 'Float',
}

export interface FeatureResult {
    type:string,
    id:string,
    geometry:any,
    geometry_name:string,
    properties:any,
    layer?:string,
    index?:number
}

export interface GetLayerInputFeaturesData {
    data:any
    type:'model'|'layerInput'|'draw'|'number'
}

export interface AnalyzeRunResult {
    result?:any
    feature?: JSON
}