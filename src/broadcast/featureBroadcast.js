import { ref } from "vue";
const featureBroadcast = ref({
    id: '',
    value: []
});
export default function featureBC() {
    function setFeaturesBC(value, id) {
        featureBroadcast.value = {
            id: id,
            value: value
        };
    }
    return { featureBroadcast, setFeaturesBC };
}
export var featureBCEnums;
(function (featureBCEnums) {
    featureBCEnums["setFeatureAsModelInput"] = "setFeatureAsModelInput";
})(featureBCEnums || (featureBCEnums = {}));
//# sourceMappingURL=featureBroadcast.js.map