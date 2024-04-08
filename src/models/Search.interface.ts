import {ActiveLayerFields, LayerFieldTypes} from "@/models/Layer.Interface";

export interface SearchMetadataParentItemInterface{
    id:number,
    children?:SearchMetadataParentItemInterface[],
    type?:'and'|'or'
    field?:string,
    fieldType?:LayerFieldTypes
    operation?:string,
    value?:any
}

