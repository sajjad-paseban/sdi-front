import {ActionTree} from "vuex";

import {RootState} from "@/store/types";

import {LayerItem, OpenLayer} from "@/store/openLayer/types";
import Api from "@/api/extraInLayer/routes";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import {BaseMapInterface} from "@/models/BaseMap.interface";
import XYZ from "ol/source/XYZ";
import Config_Api from "@/api/mapConfig/routes";
import Access_Api from "@/api/access/routes";
import {GetMapConfigInterface} from "@/models/MapConfig.interface";
import {UserStates} from "@/store/user/types";
import {LayerTree} from "@/models/Layer.Interface";


export enum OpenLayerAction {
    GET_LAYERS = 'GET_LAYERS',
    SET_SHOW_LAYERS = 'SET_SHOW_LAYERS',
    SET_BASE_MAP = 'SET_BASE_MAP',
    SET_MAP_CONFIG = 'SET_MAP_CONFIG',
    SET_LAYERS_SORT = 'SET_LAYERS_SORT',
    SET_SHOW_LAYERS_INIT = 'SET_SHOW_LAYERS_INIT',

    SET_SUB_SHOW_LAYERS = 'SET_SUB_SHOW_LAYERS',
    SET_SUB_BASE_MAP = 'SET_SUB_BASE_MAP',
    SET_SUB_SHOW_LAYERS_INIT = 'SET_SUB_SHOW_LAYERS_INIT',
    SET_INIT_FROM_LOCAL = 'SET_INIT_FROM_LOCAL'
}

export const actions: ActionTree<OpenLayer, RootState> = {

    async [OpenLayerAction.SET_INIT_FROM_LOCAL](context, toast): Promise<void> {
        const layers = localStorage.getItem('LAYERS')
        const showLayers = localStorage.getItem('SHOW_LAYERS')
        const layersTree = localStorage.getItem('LAYERS_TREE')

        if (typeof layers === 'string') {
            const layersData: UserStates = JSON.parse(layers)
            context.commit(OpenLayerMutations.SET_LAYERS_SORT, layersData)
            context.commit(OpenLayerMutations.SET_LAYERS, layersData)
        }

        if (typeof showLayers === 'string') {
            const showLayersData: UserStates = JSON.parse(showLayers)
            context.commit(OpenLayerMutations.SET_SHOW_LAYERS, showLayersData)
            context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, showLayersData)
        }

        if (typeof layersTree === 'string') {
            const layerTreesData: LayerTree[] = JSON.parse(layersTree)
            context.commit(OpenLayerMutations.SET_LAYERS_TREE, layerTreesData)
        }


    },

    async [OpenLayerAction.GET_LAYERS](context, toast): Promise<void> {
        const layers = await Api.getLayers<LayerItem[]>(toast)
        context.commit(OpenLayerMutations.SET_LAYERS, layers.result)
    },

    [OpenLayerAction.SET_SHOW_LAYERS](context, selectedLayers: number[]): void {
        context.commit(OpenLayerMutations.SET_SHOW_LAYERS,
            context.state.layers.filter((layer) => {
                return selectedLayers.includes(layer.id)
            })
        )
    },

    [OpenLayerAction.SET_SUB_SHOW_LAYERS](context, selectedLayers: number[]): void {
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS,
            context.state.layers.filter((layer) => {
                return selectedLayers.includes(layer.id)
            })
        )
    },

    [OpenLayerAction.SET_BASE_MAP](context, baseMap: BaseMapInterface): void {
        context.state.map?.getAllLayers()?.map((layer) => {
            if (layer.get('name') && layer.get('name') === 'baseMap') {
                const source = layer.getSource()
                if (source instanceof XYZ) {
                    source.setUrl(baseMap.address)
                    context.commit(OpenLayerMutations.SET_BASE_MAP, baseMap)
                }
            }
        })
    },

    [OpenLayerAction.SET_SUB_BASE_MAP](context, baseMap: BaseMapInterface): void {
        context.state.sub_map?.getAllLayers()?.map((layer) => {
            if (layer.get('name') && layer.get('name') === 'baseMap') {
                const source = layer.getSource()
                if (source instanceof XYZ) {
                    source.setUrl(baseMap.address)
                    context.commit(OpenLayerMutations.SET_SUB_BASE_MAP, baseMap)
                }
            }
        })
    },

    async [OpenLayerAction.SET_MAP_CONFIG](context, toast): Promise<void> {
        const config = await Config_Api.getRoleMapConfig<GetMapConfigInterface>(toast)
        context.commit(OpenLayerMutations.SET_MAP_CONFIG, config.result)
        if (config.result)
            context.commit(OpenLayerMutations.SET_BASE_MAP, config.result.baseMap)
    },


    async [OpenLayerAction.SET_LAYERS_SORT](context, toast): Promise<void> {
        const layers = await Api.layerSortList<LayerItem[]>(toast)
        const parsed = JSON.stringify(layers.result);

        if (localStorage.getItem('LAYERS')) {
            localStorage.removeItem('LAYERS')
        }
        localStorage.setItem('LAYERS', parsed);
        context.commit(OpenLayerMutations.SET_LAYERS_SORT, layers.result)
        context.commit(OpenLayerMutations.SET_LAYERS, layers.result)
    },

    async [OpenLayerAction.SET_SHOW_LAYERS_INIT](context, toast): Promise<void> {
        const layers = await Access_Api.getRoleLayerAccessShow<LayerItem[]>(toast)
        const parsed = JSON.stringify(layers.result);

        if (localStorage.getItem('SHOW_LAYERS')) {
            localStorage.removeItem('SHOW_LAYERS')
        }
        localStorage.setItem('SHOW_LAYERS', parsed);
        context.commit(OpenLayerMutations.SET_SHOW_LAYERS, layers.result)
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, layers.result)
    },

    async [OpenLayerAction.SET_SUB_SHOW_LAYERS_INIT](context, toast): Promise<void> {
        const layers = await Access_Api.getRoleLayerAccessShow<LayerItem[]>(toast)
        context.commit(OpenLayerMutations.SET_SUB_SHOW_LAYERS, layers.result)
    },


}