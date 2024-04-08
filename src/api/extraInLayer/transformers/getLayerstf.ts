import {z} from "zod";
import {getLayersValidator} from "@/api/extraInLayer/validations/getLayers.vd";
import {LayerItem} from "@/store/openLayer/types";

type getLayersGdModel = z.infer<typeof getLayersValidator>;

export function getLayersTransformer(inputValidated: getLayersGdModel): LayerItem[] {
    return [...inputValidated]

}