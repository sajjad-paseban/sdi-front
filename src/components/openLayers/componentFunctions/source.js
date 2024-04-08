import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";
import GeoJSON from "ol/format/GeoJSON";
import VectorSource from 'ol/source/Vector.js';
import { ref } from "vue";
import * as turf from '@turf/turf';
import Collection from 'ol/Collection.js';
import { LineString, MultiPoint, MultiLineString, MultiPolygon } from 'ol/geom';
import { getArea, getLength } from "ol/sphere";
import { getCenter } from "ol/extent";
export default function source_functions() {
    const toast = useToast();
    const router = useRouter();
    const geoJsonFormat = ref(new GeoJSON({}));
    const addFeature = (source, data, style) => {
        let features = [];
        if (data instanceof Array) {
            data.map((feature) => {
                features.push(geoJsonFormat.value.readFeature(feature));
            });
        }
        else if (data instanceof Collection) {
            data.getArray().map((feature) => {
                features.push(geoJsonFormat.value.readFeature(feature));
            });
        }
        else {
            features = geoJsonFormat.value.readFeatures(data);
        }
        features.map((feature) => {
            getPkFromWfsRequest(feature);
        });
        if (style) {
            features.map((feature) => {
                feature.setStyle(style);
            });
        }
        source.addFeatures(features);
    };
    const addFeatureObject = (source, data, style, LStyle) => {
        const features = data;
        if (style) {
            if (LStyle) {
                features.map((feature) => {
                    feature.setStyle([style, LStyle]);
                });
            }
            else {
                features.map((feature) => {
                    feature.setStyle([style]);
                });
            }
        }
        source.addFeatures(features);
    };
    const featuresToCenterPointFeatures = (data) => {
        const features = [];
        const newData = JSON.parse(JSON.stringify(data));
        if (newData instanceof Array) {
            newData.map((feature) => {
                feature.geometry = turf.centerOfMass(feature).geometry;
                features.push(feature);
            });
        }
        else {
            newData.geometry = turf.centerOfMass(newData).geometry;
            features.push(newData);
        }
        return features;
    };
    const getCenterOfFeature = (feature) => {
        const geo = feature.getGeometry();
        if (geo) {
            const featureJson = geoJsonFormat.value.writeGeometry(geo);
            return turf.centerOfMass(JSON.parse(featureJson)).geometry;
        }
        else {
            return null;
        }
    };
    const getJsonFeaturesInfo = (data) => {
        const features = geoJsonFormat.value.readFeatures(data);
        features.map((feature) => {
            getPkFromWfsRequest(feature);
        });
        return features;
    };
    const getJsonFeatureInfo = (data) => {
        const feature = geoJsonFormat.value.readFeature(data);
        getPkFromWfsRequest(feature);
        return feature;
    };
    const geometryToJson = (data) => {
        return geoJsonFormat.value.writeGeometry(data);
    };
    const featuresToJson = (data) => {
        return geoJsonFormat.value.writeFeatures(data);
    };
    const featureToJson = (data, to_object = false) => {
        if (to_object) {
            return geoJsonFormat.value.writeFeatureObject(data);
        }
        else {
            return geoJsonFormat.value.writeFeature(data);
        }
    };
    const getPkFromWfsRequest = (feature) => {
        if (feature.getId()) {
            const pk = feature.getId().split('.')[1];
            feature.set('pk', pk);
        }
    };
    const addFeaturesObject = (source, features) => {
        source.addFeatures(features);
    };
    function getGeometryFromFeatures(features) {
        if (features.length > 1) {
            let res = null;
            const geos = features.map((feature) => {
                return feature.getGeometry();
            });
            const geoType = geos[0]?.getType();
            if (geoType === 'Point') {
                res = new MultiPoint([]);
                geos.map((geo) => {
                    if (geo?.getType() === geoType) {
                        res.appendPoint(geo);
                    }
                });
            }
            else if (geoType === 'Polygon') {
                res = new MultiPolygon([]);
                geos.map((geo) => {
                    if (geo?.getType() === geoType) {
                        res.appendPoint(geo);
                    }
                });
            }
            else if (geoType === 'LineString') {
                res = new MultiLineString([]);
                geos.map((geo) => {
                    if (geo?.getType() === geoType) {
                        res.appendPoint(geo);
                    }
                });
            }
            return res;
        }
        else if (features.length === 1) {
            return features[0].getGeometry();
        }
        else {
            return null;
        }
    }
    const formatArea = (polygon) => {
        const area = getArea(polygon) * 10000000000;
        return Math.round(area * 100) / 100;
    };
    const formatLength = (lineGeo) => {
        const length = getLength(lineGeo) * 100000;
        return Math.round(length * 100) / 100;
    };
    const getClosestPointFeatureFromCoordinate = (features, coordinate) => {
        let min_len = 1000;
        let closest_feature = null;
        features.map((feature) => {
            const geo = feature.getGeometry();
            if (geo) {
                const extent = geo.getExtent();
                const center = getCenter(extent);
                const line = new LineString([coordinate, center]);
                const len = formatLength(line);
                if (len < min_len) {
                    min_len = len;
                    closest_feature = feature;
                }
            }
        });
        return closest_feature;
    };
    const refreshLayer = function (map) {
        map.getLayers().forEach((layer) => {
            if (layer.get('name') && layer.get('name') === "ownLayer") {
                layer.getSource().refresh();
                console.log('refresh layer');
            }
        });
    };
    const zoomToFeatures = (map, features, padding = [200, 200, 200, 200]) => {
        if (features.length > 0) {
            const vectorSource = new VectorSource({});
            vectorSource.addFeatures(features);
            const bounds = vectorSource.getExtent();
            map.getView().fit(bounds, { padding: padding, duration: 1000, maxZoom: 20 });
        }
    };
    return {
        zoomToFeatures,
        getClosestPointFeatureFromCoordinate,
        addFeature,
        getJsonFeaturesInfo,
        featuresToCenterPointFeatures,
        addFeaturesObject,
        featureToJson,
        featuresToJson,
        getGeometryFromFeatures,
        geometryToJson,
        getCenterOfFeature,
        getJsonFeatureInfo,
        addFeatureObject,
        formatArea,
        formatLength,
        refreshLayer
    };
}
//# sourceMappingURL=source.js.map