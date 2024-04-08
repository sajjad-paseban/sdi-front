import GeoJSON from "ol/format/GeoJSON";
export function getSurveyRegionInfoTransformer(inputValidated) {
    const geoJsonFormat = new GeoJSON({});
    const result = [];
    inputValidated.map((item) => {
        const TFeatures = [];
        item.features.map((feature) => {
            let geometry = null;
            geometry = geoJsonFormat.readFeature(JSON.parse(feature));
            TFeatures.push(geometry);
        });
        result.push({ ...item, features: TFeatures });
    });
    return result;
}
//# sourceMappingURL=getSurveyRegionInfo.tf.js.map