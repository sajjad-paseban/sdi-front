import GeoJSONFeature from "ol/format/GeoJSON";
import {BuildingExtraInfo} from "@/models/Survey.interface";

export interface addBuildingInterface {
    info: BuildingExtraInfo,
    geometry?:{geoJson:GeoJSONFeature},
}