import GeoJSONFeature from "ol/format/GeoJSON";
import {
    ArseRange,
    ArseUsingType,
    ElevatorInfo,
    ParkingAndStore,
    ParkingAndStoreAndCommons,
    Yard
} from "@/models/Survey.interface";

export interface addArseExtraInterface {
    arse_parking?:ParkingAndStore|null
    arse_using?:ArseUsingType[]
    arse_range?:ArseRange[],
    arse_yard?:(Yard & { geometry: { geoJson: GeoJSONFeature } | null })|null


}