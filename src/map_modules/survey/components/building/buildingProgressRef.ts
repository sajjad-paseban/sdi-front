import {LayerInputData} from "@/models/Analyze.interface";
import {Arse, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";

export interface BuildingProgressRef {
    nextPageFunc ():ProgressNextPageFuncRes ;
}

export interface BuildingResultTableRef {
    nextPageFunc (): BuildingResultTableNextPageFuncRes;
}

export interface AddBuildingFuncRes{
    nextPageFunc (): BuildingNextPageFuncRes;
}

export interface BuildingNextPageFuncRes{
    error:string|null,
    result:null|SelectedBuilding
}

export interface ProgressNextPageFuncRes{
    error:string|null,
    result:null|ProgressInfo[]
}

export interface BuildingResultTableNextPageFuncRes{
    error:string|null,
    result:null|SelectedBuilding
}