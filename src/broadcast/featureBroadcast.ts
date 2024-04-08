import {ref} from "vue";
import Feature from 'ol/Feature.js';


export interface FeatureBroadcast {
    id: string,
    value: Feature[]
}

const featureBroadcast = ref<FeatureBroadcast>({
    id: '',
    value: []
})

export default function featureBC() {
    function setFeaturesBC(value: Feature[], id: string) {
        featureBroadcast.value = {
            id: id,
            value: value
        }
    }

    return {featureBroadcast, setFeaturesBC}
}

export enum featureBCEnums {
    setFeatureAsModelInput = 'setFeatureAsModelInput'
}