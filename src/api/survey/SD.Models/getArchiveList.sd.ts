import GeoJSONFeature from "ol/format/GeoJSON";
import {BuildingExtraInfo} from "@/models/Survey.interface";

export interface getArchiveListInterface {
    group: null|number,
    master: null|number,
    subsystem: null|number,
    archive_type: null|number,
    business_id?: number | null,
    business_unit_id?: number | null,
    arse_id?: number | null,
    building_id?: number | null,
    apartment_id?: number | null,
}