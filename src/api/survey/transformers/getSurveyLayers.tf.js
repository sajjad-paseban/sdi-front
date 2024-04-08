import store from "@/store";
export function getSurveyLayersTransformer(inputValidated) {
    const layers = store.getters.getLayers;
    const res = [];
    layers.map((layer) => {
        inputValidated.map((item) => {
            if (layer.id === item.layer) {
                res.push({
                    name: item.name,
                    layer: layer
                });
            }
        });
    });
    return res;
}
//# sourceMappingURL=getSurveyLayers.tf.js.map