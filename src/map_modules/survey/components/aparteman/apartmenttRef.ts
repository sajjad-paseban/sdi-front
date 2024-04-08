import {LayerInputData} from "@/models/Analyze.interface";
import {Aparteman, Arse, District, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";

export interface ApartmentRef {
    nextPageFunc (): ApartmentNextPageFuncRes;
}

export interface ApartmentNextPageFuncRes{
    error:string|null,
    result:null|Aparteman
}

