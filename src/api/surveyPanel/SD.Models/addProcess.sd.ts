import GeoJSONFeature from "ol/format/GeoJSON";

export interface AddProcessItem{
    estimated_features:number|null,
    survey_person:number|null,
    checker:number|null,
    manager:number|null,
    lock_in_place:boolean,
    start_date:string|null,
    end_date:string|null,
    code?:string,
    geometry:{geoJson:GeoJSONFeature}|null
}