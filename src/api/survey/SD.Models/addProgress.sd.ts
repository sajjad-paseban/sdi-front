import GeoJSONFeature from "ol/format/GeoJSON";
import {ProgressInfo} from "@/models/Survey.interface";

export interface addProgressInterface {
    progress: (ProgressInfo&{geometry:{geoJson:GeoJSONFeature}|null})[],
    building:number,


}