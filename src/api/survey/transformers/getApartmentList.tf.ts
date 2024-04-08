import {z} from "zod";
import {getApartmentListValidator} from "@/api/survey/validations/getApartmentsList.vd";
import {Aparteman} from "@/models/Survey.interface";
import GeoJSON from "ol/format/GeoJSON";


type getApartmentListValidatorGdModel = z.infer<typeof getApartmentListValidator>;

export function getApartmentListTransformer(inputValidated: getApartmentListValidatorGdModel): Aparteman[] {
    const apartments:Aparteman[] = []
    const geoJsonFormat = new GeoJSON({})

    inputValidated.map((item)=>{
        let geometry: any = null

        if (item.geometry) {
            geometry = geoJsonFormat.readFeature(JSON.parse(item.geometry))
        }
        apartments.push({...item,geometry:geometry})
    })

    return apartments
}