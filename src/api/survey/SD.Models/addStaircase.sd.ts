import GeoJSONFeature from "ol/format/GeoJSON";
import {ElevatorInfo} from "@/models/Survey.interface";

export interface addStairCaseInterface {
    elevator_info: (ElevatorInfo & { geometry: { geoJson: GeoJSONFeature } | null })[],
    staircase_info: (ElevatorInfo & { geometry: { geoJson: GeoJSONFeature } | null })[],
}