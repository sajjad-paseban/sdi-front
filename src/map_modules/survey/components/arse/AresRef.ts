import {LayerInputData} from "@/models/Analyze.interface";
import {Arse, District, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";

export interface ArseRef {
    nextPageFunc (): ArseNextPageFuncRes;
}

export interface ArseNextPageFuncRes{
    error:string|null,
    result:null|Arse
}

export interface SideInfoRef {
    nextPageFunc (): SideInfoNextPageFuncRes;
}

export interface SideInfoNextPageFuncRes{
    error:string|null,
    result:null|District[]
}
