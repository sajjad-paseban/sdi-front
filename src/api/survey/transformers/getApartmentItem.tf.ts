import {z} from "zod";
import {getApartmentValidator} from "@/api/survey/validations/getApartmentsList.vd";
import {Aparteman} from "@/models/Survey.interface";
import GeoJSON from "ol/format/GeoJSON";


type getApartmentItemValidatorGdModel = z.infer<typeof getApartmentValidator>;

export function getApartmentItemTransformer(inputValidated: getApartmentItemValidatorGdModel): Aparteman {
    let geometry: any = null
    const geoJsonFormat = new GeoJSON({})
    if (inputValidated.geometry) {
        geometry = geoJsonFormat.readFeature(JSON.parse(inputValidated.geometry))
    }

    return {...inputValidated,geometry:geometry}
}