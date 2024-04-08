import GeoJSON from "ol/format/GeoJSON";
export function getProcessListTransformer(inputValidated) {
    const geoJsonFormat = new GeoJSON({});
    const result = [];
    inputValidated.map((item) => {
        const geometry = geoJsonFormat.readFeature(JSON.parse(item.feature));
        result.push({ ...item, feature: geometry });
    });
    return result;
}
export function getProcessItemTransformer(inputValidated) {
    const geoJsonFormat = new GeoJSON({});
    const geometry = geoJsonFormat.readFeature(JSON.parse(inputValidated.feature));
    return { ...inputValidated, feature: geometry };
}
//# sourceMappingURL=getProcessList.tf.js.map