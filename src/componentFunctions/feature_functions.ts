import {useToast} from "primevue/usetoast";
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {LayerItem} from "@/store/openLayer/types";
import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
import Geometry from 'ol/geom/Geometry.js';
import Feature from 'ol/Feature.js';
import {Field} from "@/models/Feature.interface";
import GeoJSON from "ol/format/GeoJSON";
import {ref} from "vue";
import {Layer_types} from "@/models/Layer.Interface";
import MultiPolygon from 'ol/geom/MultiPolygon.js';
import MultiLineString from 'ol/geom/MultiLineString.js';
import MultiPoint from 'ol/geom/MultiPoint.js';
import GeoJSONFeature from "ol/format/GeoJSON";
import {addFeatureInterface} from "@/api/feature/SD.Models/addFeature";
import {StoreActions} from "@/store";
import {default as Feature_Api} from "@/api/feature/routes";
import {transitionFeatureInterface} from "@/api/feature/SD.Models/transitionFeature";

export default function feature_functions() {
    const toast = useToast()
    const store = useStore()
    const router = useRouter()

    const {getActiveLayerFields, activeLayerFieldsList,} = extra_layer_functions()
    const geoJsonFormat = ref<GeoJSON>(new GeoJSON({}))


    const getLayerFieldsInFeature = async () => {
        const layerItem: LayerItem | null = store.getters.getActiveLayer
        if (layerItem) {
            if (layerItem.imported_type !== 'wms') {
                await getActiveLayerFields(layerItem.id)
            }
        }
    }

    const makeGeoJsonFeature = (geometries: any, layerFields: Field[], layerType: Layer_types): any => {
        let geometry: Geometry | null = null

        switch (layerType) {
            case Layer_types.MultiPolygon:
                geometry = new MultiPolygon(geometries)
                break;
            case Layer_types.MultiLine:
                geometry = new MultiLineString(geometries)
                break;
            case Layer_types.MultiPoint:
                geometry = new MultiPoint(geometries)
                break;
            default:
                if (geometries.length == 1)
                    geometry = geometries[0]
        }
        const feature = new Feature()
        if (geometry)
            feature.setGeometry(geometry)
        layerFields.map((field) => {
            feature.set(String(field.id), field.value)
        })


        return geoJsonFormat.value.writeFeatureObject(feature)
    }

    const addFeature = async (data: GeoJSONFeature, layerId: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Feature_Api.addFeature({geoJson: data}, layerId, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const editFeature = async (data: GeoJSONFeature, layerId: number, featureId: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Feature_Api.editFeature({geoJson: data}, [layerId, featureId], toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const deleteFeature = async (layerId: number, featureId: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Feature_Api.deleteFeature([layerId, featureId], toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const copyFeatures = async (data: transitionFeatureInterface, layerId: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Feature_Api.copyFeatures(data, layerId, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }

    const moveFeatures = async (data: transitionFeatureInterface, layerId: number) => {
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
        const response = await Feature_Api.moveFeatures(data, layerId, toast)
        await store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
        return response.text.length <= 0;
    }


    return {
        getLayerFieldsInFeature,
        activeLayerFieldsList,
        getActiveLayerFields,
        makeGeoJsonFeature,
        addFeature,
        editFeature,
        deleteFeature,
        copyFeatures,
        moveFeatures
    }
}