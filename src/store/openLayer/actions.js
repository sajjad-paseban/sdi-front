import Api from "@/api/extraInLayer/routes";
import { OpenLayerMutations } from "@/store/openLayer/mutations";
import XYZ from "ol/source/XYZ";
import Config_Api from "@/api/mapConfig/routes";
import Access_Api from "@/api/access/routes";
export var OpenLayerAction;
(function (OpenLayerAction) {
    OpenLayerAction["GET_LAYERS"] = "GET_LAYERS";
    OpenLayerAction["SET_SHOW_LAYERS"] = "SET_SHOW_LAYERS";
    OpenLayerAction["SET_BASE_MAP"] = "SET_BASE_MAP";
    OpenLayerAction["SET_MAP_CONFIG"] = "SET_MAP_CONFIG";
    OpenLayerAction["SET_LAYERS_SORT"] = "SET_LAYERS_SORT";
    OpenLayerAction["SET_SHOW_LAYERS_INIT"] = "SET_SHOW_LAYERS_INIT";
    OpenLayerAction["SET_SUB_SHOW_LAYERS"] = "SET_SUB_SHOW_LAYERS";
    OpenLayerAction["SET_SUB_BASE_MAP"] = "SET_SUB_BASE_MAP";
    OpenLayerAction["SET_SUB_SHOW_LAYERS_INIT"] = "SET_SUB_SHOW_LAYERS_INIT";
    OpenLayerAction["SET_INIT_FROM_LOCAL"] = "SET_INIT_FROM_LOCAL";
})(OpenLayerAction || (OpenLayerAction = {}));
export const actions = {
    async [OpenLayerAction.SET_INIT_FROM_LOCAL](context, toast) {
        const layers = localStorage.getItem('LAYERS');
        const showLayers = localStorage.getItem('SHOW_LAYERS');
        const layersTree = localStorage.getItem('LAYERS_TREE');
        if (typeof layers === 'string') {
            const layersData = JSON.parse(layers);
            context.commit(OpenLayerMutations.SET_LAYERS_SORT, layersData);
            context.commit(OpenLayerMutations.SET_LAYERS, layersData);
        }
        if (typeof showLayers === 'string') {
            const showLayersData = JSON.parse(showLayers);
            context.commit(OpenLayerMutations.SET_SHOW_LAYERS, showLayersData);
            context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, showLayersData);
        }
        if (typeof layersTree === 'string') {
            const layerTreesData = JSON.parse(layersTree);
            context.commit(OpenLayerMutations.SET_LAYERS_TREE, layerTreesData);
        }
    },
    async [OpenLayerAction.GET_LAYERS](context, toast) {
        const layers = await Api.getLayers(toast);
        context.commit(OpenLayerMutations.SET_LAYERS, layers.result);
    },
    [OpenLayerAction.SET_SHOW_LAYERS](context, selectedLayers) {
        context.commit(OpenLayerMutations.SET_SHOW_LAYERS, context.state.layers.filter((layer) => {
            return selectedLayers.includes(layer.id);
        }));
    },
    [OpenLayerAction.SET_SUB_SHOW_LAYERS](context, selectedLayers) {
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, context.state.layers.filter((layer) => {
            return selectedLayers.includes(layer.id);
        }));
    },
    [OpenLayerAction.SET_BASE_MAP](context, baseMap) {
        context.state.map?.getAllLayers()?.map((layer) => {
            if (layer.get('name') && layer.get('name') === 'baseMap') {
                const source = layer.getSource();
                if (source instanceof XYZ) {
                    source.setUrl(baseMap.address);
                    context.commit(OpenLayerMutations.SET_BASE_MAP, baseMap);
                }
            }
        });
    },
    [OpenLayerAction.SET_SUB_BASE_MAP](context, baseMap) {
        context.state.sub_map?.getAllLayers()?.map((layer) => {
            if (layer.get('name') && layer.get('name') === 'baseMap') {
                const source = layer.getSource();
                if (source instanceof XYZ) {
                    source.setUrl(baseMap.address);
                    context.commit(OpenLayerMutations.SET_SUB_BASE_MAP, baseMap);
                }
            }
        });
    },
    async [OpenLayerAction.SET_MAP_CONFIG](context, toast) {
        const config = await Config_Api.getRoleMapConfig(toast);
        context.commit(OpenLayerMutations.SET_MAP_CONFIG, config.result);
        if (config.result)
            context.commit(OpenLayerMutations.SET_BASE_MAP, config.result.baseMap);
    },
    async [OpenLayerAction.SET_LAYERS_SORT](context, toast) {
        const layers = await Api.layerSortList(toast);
        const parsed = JSON.stringify(layers.result);
        if (localStorage.getItem('LAYERS')) {
            localStorage.removeItem('LAYERS');
        }
        localStorage.setItem('LAYERS', parsed);
        context.commit(OpenLayerMutations.SET_LAYERS_SORT, layers.result);
        context.commit(OpenLayerMutations.SET_LAYERS, layers.result);
    },
    async [OpenLayerAction.SET_SHOW_LAYERS_INIT](context, toast) {
        const layers = await Access_Api.getRoleLayerAccessShow(toast);
        const parsed = JSON.stringify(layers.result);
        if (localStorage.getItem('SHOW_LAYERS')) {
            localStorage.removeItem('SHOW_LAYERS');
        }
        localStorage.setItem('SHOW_LAYERS', parsed);
        context.commit(OpenLayerMutations.SET_SHOW_LAYERS, layers.result);
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, layers.result);
    },
    async [OpenLayerAction.SET_SUB_SHOW_LAYERS_INIT](context, toast) {
        const layers = await Access_Api.getRoleLayerAccessShow(toast);
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, layers.result);
    },
};
//# sourceMappingURL=actions.js.map