import GeoJSON from "ol/format/GeoJSON";
export function getArseTransformer(inputValidated) {
    let geometry = null;
    const arse_yard = { ...inputValidated.arse_yard, feature: null };
    const geoJsonFormat = new GeoJSON({});
    if (inputValidated.geometry) {
        geometry = geoJsonFormat.readFeature(JSON.parse(inputValidated.geometry));
    }
    if (inputValidated.arse_yard && inputValidated.arse_yard.feature) {
        arse_yard.feature = geoJsonFormat.readFeature(JSON.parse(inputValidated.arse_yard?.feature));
    }
    const res = { ...inputValidated, arse_yard: arse_yard, buildings: [], geometry: geometry };
    if (inputValidated.buildings) {
        inputValidated.buildings.map((building) => {
            if (building.feature) {
                building.feature = geoJsonFormat.readFeature(JSON.parse(building.feature));
            }
            if (building.progressInfo) {
                building.progressInfo.map((progress) => {
                    if (progress.feature) {
                        progress.feature = geoJsonFormat.readFeature(JSON.parse(progress.feature));
                    }
                });
            }
            if (building.elevator_info) {
                building.elevator_info.map((elevator) => {
                    if (elevator.feature) {
                        elevator.feature = geoJsonFormat.readFeature(JSON.parse(elevator.feature));
                    }
                });
            }
            if (building.staircase_info) {
                building.staircase_info.map((staircase) => {
                    if (staircase.feature) {
                        staircase.feature = geoJsonFormat.readFeature(JSON.parse(staircase.feature));
                    }
                });
            }
        });
    }
    return { ...inputValidated, arse_yard: arse_yard, geometry: geometry };
}
//# sourceMappingURL=getArse.tf.js.map