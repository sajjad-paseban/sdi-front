import { z } from "zod";
export const getSurveyLayerValidator = z.object({
    name: z.string(),
    layer: z.number()
});
export const getSurveyLayersValidator = z.array(getSurveyLayerValidator);
//# sourceMappingURL=getSurveyLayers.vd.js.map