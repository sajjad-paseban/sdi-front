import {z} from "zod";
import {getSurveyLayersValidator} from "@/api/survey/validations/getSurveyLayers.vd";
import {SurveyLayers} from "@/store/survey/types";
import store from "@/store";
import {LayerItem} from "@/store/openLayer/types";


type getSurveyLayersValidatorGdModel = z.infer<typeof getSurveyLayersValidator>;

export function getSurveyLayersTransformer(inputValidated: getSurveyLayersValidatorGdModel): SurveyLayers[] {

    const layers: LayerItem[] = store.getters.getLayers

    const res: SurveyLayers[] = []

    layers.map((layer) => {
        inputValidated.map((item) => {
            if (layer.id === item.layer) {
                res.push({
                    name: item.name,
                    layer: layer
                })
            }
        })
    })
    return res
}