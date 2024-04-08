import GeoJSON from "ol/format/GeoJSON";
export function getApartmentListTransformer(inputValidated) {
    const apartments = [];
    const geoJsonFormat = new GeoJSON({});
    inputValidated.map((item) => {
        let geometry = null;
        if (item.geometry) {
            geometry = geoJsonFormat.readFeature(JSON.parse(item.geometry));
        }
        apartments.push({ ...item, geometry: geometry });
    });
    return apartments;
}
//# sourceMappingURL=getApartmentList.tf.js.map