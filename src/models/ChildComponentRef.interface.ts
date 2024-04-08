import {ResponseLayerUpload} from "@/models/Layer.Interface";
import {AddAnalyze, LayerInputData} from "@/models/Analyze.interface";

export interface AddLayerByFile {

    nextPageFunc (): Promise<{result:boolean,data:ResponseLayerUpload|null}>;
}

export interface AddAnalyzeRef {

    nextPageFunc (analyze:AddAnalyze): Promise<{result:boolean,data:ResponseLayerUpload|null}>;
}

export interface AddLayerInput {

    nextPageFunc (): Promise<{result:boolean,data:LayerInputData|null}>;
}