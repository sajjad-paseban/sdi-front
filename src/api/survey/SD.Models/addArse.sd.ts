import GeoJSONFeature from "ol/format/GeoJSON";

export interface addArseInterface {
    code?:string,
    area: number,
    geometry?:{geoJson:GeoJSONFeature},
    code_location: number,
    code_physical_natures: number,
    explanation: string | null,
    relation_id?:number|null,
    process_id?:number|null

}