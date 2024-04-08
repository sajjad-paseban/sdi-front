import GeoJSON from "ol/format/GeoJSON";
export function getApartmentItemTransformer(inputValidated) {
    let geometry = null;
    const geoJsonFormat = new GeoJSON({});
    if (inputValidated.geometry) {
        geometry = geoJsonFormat.readFeature(JSON.parse(inputValidated.geometry));
    }
    return { ...inputValidated, geometry: geometry };
}
//# sourceMappingURL=getApartmentItem.tf.js.map