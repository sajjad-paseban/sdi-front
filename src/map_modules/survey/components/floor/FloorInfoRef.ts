import {LayerInputData} from "@/models/Analyze.interface";
import {FloorInfo, ParkingAndStoreAndCommons, ProgressInfo, SelectedBuilding} from "@/models/Survey.interface";

export interface AddParkingRef {
    nextPageFunc (): ParkingAndStoreAndCommons[];
}

export interface FloorExtraInfoRef {
    nextPageFunc (): FloorNextPageFuncRes;
}


export interface FloorNextPageFuncRes{
    error:string|null,
    result:null|FloorInfo
}
