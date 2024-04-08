import GeoJSONFeature from "ol/format/GeoJSON";
import {BuildingExtraInfo} from "@/models/Survey.interface";

export interface AddApartmentFeatureInterface {
    geometry:{geoJson:GeoJSONFeature}|null,
}