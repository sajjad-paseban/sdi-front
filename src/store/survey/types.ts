import Feature from 'ol/Feature.js';
import {LayerItem} from "@/store/openLayer/types";
import {Arse, BusinessUnitInfo} from "@/models/Survey.interface";
import {AddProcessItem} from "@/api/surveyPanel/SD.Models/addProcess.sd";
import {PanelUser} from "@/models/SurveyPanel.interface";


export interface SurveyLayers {
    name: string,
    layer: LayerItem
}
export interface CodingTableRecord {
    title:string,
    alias:string
}

export interface TaskbarInfoFeatures{
    id:number,
    name:string,
    feature:Feature[],
    group:number
    show:boolean
    children?:TaskbarInfoFeatures[]
}

export interface TaskbarInfoCode{
    name:string,
    code:string
}

export interface TaskbarInfo{
    panelName:string|null,
    code:TaskbarInfoCode|null,
    ownerName:string|null,
    features:TaskbarInfoFeatures[]
}

export interface ArchiveData{
    business_id: number | null,
    business_unit_id: number | null,
    arse_id: number | null,
    building_id: number | null,
    apartment_id: number | null,
}


export interface MainDialog{
    title:string,
    show:boolean
    component:string|null
}

export interface UpdateShowTree{
    run:boolean,
    old_features:Feature[]|null
}

export interface Survey {
    drawFeature: Feature | null,
    loadFromSdi:boolean,
    activeDraw: boolean,
    showFeatures: Feature[],
    editFeatures: Feature[],
    survey_layers: SurveyLayers[]
    coding_table:CodingTableRecord[],
    mapDisable:boolean,
    arseInfo:Arse|null,
    businessUnitInfo:null|BusinessUnitInfo,
    taskBarInfo:TaskbarInfo,
    archiveData:ArchiveData|null,
    mainDialog:MainDialog|null,
    panelTopic:string
    panel_user:PanelUser|null,
    closeDrawFeature:boolean,

}