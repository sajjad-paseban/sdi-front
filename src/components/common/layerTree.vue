<template>
    <div
            style="width: 100%;height: 100%">

        <div style="height: calc(100% - 30px);width: max-content;min-width: 100%;background-color:white;overflow-y: auto;overflow-x: hidden"
             class="elevation-1 rounded-lg py-3 px-1  elevation-3">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>

            <template v-if="initData&&!fullScreen">
                <v-fade-transition v-for="item in layersTreeList" :key="item.id">
                    <Tree1
                            :key-object="'id'"
                            :item="item"
                            class="pr-2"
                            :active-item="store.getters.getActiveLayer"
                            :activeCheckBox="true"
                            @checkBoxChange="checkBoxChange"
                            :itemClick="treeItemClick"
                            :label="'name'"
                            :item-click="setActiveLayer"
                            :initSelected="initSelected"
                            :image="'image'"
                            dir="rtl"
                    >
                        <template #action="{item}">
                            <div style="width: 40px!important;height: 20px!important" class="myTree">
                                <v-slider
                                        v-if="item.is_service"
                                        :max="1"
                                        v-model="item['opacity']"
                                        :min="0"
                                        :model-value="item['opacity']!==undefined?item['opacity']:1"
                                        rounded="true"
                                        class="mt-n1"
                                        thumb-size="10"
                                        @update:modelValue="layerTransparentChange(item)"
                                >
                                </v-slider>

                                <v-switch
                                        v-if="item.is_point"
                                        color="primary"
                                        v-model="item['cluster']"
                                        :model-value="item['cluster']!==undefined?item['cluster']:false"
                                        hide-details
                                        class="mt-n1"
                                        @update:modelValue="layerClustering(item)"
                                >
                                    <v-tooltip activator="parent" location="left"> کلاسترینگ</v-tooltip>
                                </v-switch>
                            </div>


                        </template>
                    </Tree1>
                </v-fade-transition>

            </template>

            <template v-if="initData&&fullScreen">
                <v-fade-transition v-for="item in layersTreeList" :key="item.id">
                    <Tree1
                            :key-object="'id'"
                            :item="item"
                            class="pr-2"
                            :active-item="store.getters.getSubActiveLayer"
                            :activeCheckBox="true"
                            @checkBoxChange="checkBoxChange"
                            :itemClick="treeItemClick"
                            :label="'name'"
                            :item-click="setActiveLayer"
                            :initSelected="initSelected"
                            :image="'image'"
                            dir="rtl"
                    >
                        <template #action="{item}">
                            <div style="width: 40px!important;height: 20px!important" class="myTree">
                                <v-slider
                                        v-if="item.is_service"
                                        :max="1"
                                        v-model="item['opacity']"
                                        :min="0"
                                        :model-value="item['opacity']!==undefined?item['opacity']:1"
                                        rounded="true"
                                        class="mt-n1"
                                        thumb-size="10"
                                        @update:modelValue="layerTransparentChange(item)"
                                >
                                </v-slider>

                                <v-switch
                                        v-if="item.is_point"
                                        color="primary"
                                        v-model="item['cluster']"
                                        :model-value="item['cluster']!==undefined?item['cluster']:false"
                                        hide-details
                                        @update:modelValue="layerClustering(item)"
                                >
                                    <v-tooltip activator="parent" location="left"> کلاسترینگ</v-tooltip>
                                </v-switch>
                            </div>


                        </template>
                    </Tree1>
                </v-fade-transition>

            </template>

        </div>


        <div style="height: 30px;width: 100%;">
            <v-row class="ma-0 pa-0 " style="height: 100%" justify="center" align="end">

                <v-btn
                        @click="openSortDialog"
                        style="height: 25px;width: 100%;font-weight: bold"
                        prepend-icon="mdi-sort"
                        color="primary"
                >
                    <p style="font-size: 10px"> ترتیب نمایش لایه ها</p>

                </v-btn>
            </v-row>

        </div>
        <simple-dialog
                :show="sortDialog"
                topic="ترتیب نمایش لایه ها"
                :overLayer="false"
                width="30vw"
                height="80vh"
                @closeDialog="sortDialog = false"
        >
            <v-card height="100%" min-height="40dvh" class="pa-1 " style="overflow-y: auto">
                <v-row v-if="layerSortListData.length===0" class="pa-0 ma-0 " align="center" style="height: 100%"
                       justify="center">
                    <v-fade-transition>
                        <v-progress-circular
                                :size="50"
                                color="primary"
                                indeterminate
                        ></v-progress-circular>
                    </v-fade-transition>
                </v-row>
                <template v-else>
                    <v-row class="ma-0 pa-0" style="height: calc(100% - 35px)">
                        <div style="width: calc(100% - 50px);height: 90%;overflow-y: auto">
                            <VueDraggableNext v-model="layerSortListData" @change="log">
                                <transition-group type="transition" name="flip-list">
                                    <div v-for="element in layerSortListData" :key="element.id">
                                        <v-row style="cursor: move;font-size: 11px;font-weight: bold"
                                               class="rounded border mb-1 elevation-1 ma-0 pa-0"
                                               :style="element.id===selected_layer?'background-color: rgb(var(--v-theme-primary_active))':''"
                                               @click="selectLayer(element.id)">
                                            <v-col cols="8">
                                                <v-row class="pa-0 ma-0">
                                                    <p>نام :&nbsp;</p>
                                                    <p style="color: #6200ee"> {{ element.name }}</p>
                                                </v-row>

                                            </v-col>
                                            <v-col cols="4">
                                                <v-row class="pa-0 ma-0">
                                                    <p>گروه :&nbsp; </p>
                                                    <p style="color: #6200ee"> {{ element.layer_group.name }}</p>
                                                </v-row>
                                            </v-col>


                                        </v-row>
                                    </div>

                                </transition-group>
                            </VueDraggableNext>
                        </div>
                        <div style="width: 50px;height: 90%">
                            <v-row class="ma-0 pa-0" style="height: 100%;width: 100%" align="center" justify="center">
                                <v-row class="ma-0 pa-1" justify="center">
                                    <v-col cols="12" class="ma-0 pa-1">
                                        <v-btn @click="up" color="info" size="x-small" class="rounded-lg"
                                               style="width: 20px;height: 25px">
                                            <v-icon icon="mdi-chevron-up"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" class="ma-0 pa-1">
                                        <v-btn @click="toTop" color="info" size="x-small" class="rounded-lg"
                                               style="width: 20px;height: 25px">
                                            <v-icon icon="mdi-chevron-double-up"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" class="ma-0 pa-1">
                                        <v-btn @click="toDown" color="info" size="x-small" class="rounded-lg"
                                               style="width: 20px;height: 25px">
                                            <v-icon icon="mdi-chevron-double-down"></v-icon>
                                        </v-btn>
                                    </v-col>
                                    <v-col cols="12" class="ma-0 pa-1">
                                        <v-btn @click="down" color="info" size="x-small" class="rounded-lg"
                                               style="width: 20px;height: 25px">
                                            <v-icon icon="mdi-chevron-down"></v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>

                            </v-row>
                        </div>
                    </v-row>

                    <v-row style="height: 35px" justify="end" class="ma-0 pa-0 pl-1  " align="center">
                        <v-btn prepend-icon="mdi-content-save" @click="saveSortLayers"
                               style="height: 30px;font-weight: bold" class="elevation-1" color="primary" size="x-small"
                               variant="tonal">ذخیره
                        </v-btn>
                    </v-row>
                </template>


            </v-card>
        </simple-dialog>
    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import Tree1 from "@/components/common/tree.vue";
import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
import {useStore} from "vuex";
import {OpenLayerAction} from "@/store/openLayer/actions";
import {LayerTree, ResponseLayerUpload} from "@/models/Layer.Interface";
import Map from 'ol/Map.js';
import {LayerItem} from "@/store/openLayer/types";
import {OpenLayerMutations} from "@/store/openLayer/mutations";
import SimpleDialog from "@/components/common/simpleDialog.vue";

import {VueDraggableNext} from 'vue-draggable-next'
import layer_functions from "@/componentFunctions/layer_functions";
import index from "@/store";
import {useToast} from "primevue/usetoast";


interface Item {
    label: string;
    to: string;
    des: string;
}

export default defineComponent({
    name: "layerTree",
    components: {Tree1, SimpleDialog, VueDraggableNext},
    setup(props) {
        const {
            getLayersTree,
            layersTreeList,
            saveLayersSort,
            layerSortList,
            layerSortListData,getLayerExtent
        } = extra_layer_functions()
        const store = useStore()
        const initData = ref(false)
        const toast = useToast()

        const initSelected = ref<number[]>([])
        const clearedInitSelected = ref(false)
        const selectResult = ref<number[]>([])

        watch(() => store.getters.getSubShowLayers, (layers: LayerItem[]) => {

            if (props.fullScreen) {
                const res = layers.map((layer) => {
                    return layer.id
                })

                let changeFlag = false

                const c: number[] = []

                selectResult.value.map((id) => {
                    if (res.indexOf(id) === -1) {
                        c.push(id)
                        clearedInitSelected.value = false
                    }
                })

                res.map((id) => {
                    if (selectResult.value.indexOf(id) === -1) {
                        changeFlag = true
                    }
                })

                if (changeFlag && clearedInitSelected.value) {
                    initSelected.value = [...res]
                    selectResult.value = [...res]
                } else if (changeFlag) {
                    initSelected.value = [...res, ...initSelected.value]
                    selectResult.value = [...res]
                }else if (!changeFlag&&res.length == 0){
                    initSelected.value = [...selectResult.value]
                    selectResult.value = []
                }

            }


        });

        return {
            clearedInitSelected,
            initData,
            layersTreeList,
            store,
            layerSortList,
            layerSortListData,
            saveLayersSort,
            toast,
            getLayersTree,
            initSelected,
            selectResult,
            getLayerExtent
        }
    },
    data() {
        return {
            //--------for tree-----------//
            // selectResult: [] as number[],
            // initSelected: [] as number[],
            activeItem: null as Item | null,
            //--------for tree-----------//

            sortDialog: false,
            enabled: true,
            dragging: false,
            selected_layer: 0,
        };
    },
    directives: {},

    props: {
        disableClick: {
            default: false,
            required: false
        },
        fullScreen: {
            type: Boolean,
            default: false
        },
    },

    methods: {
        //--------for tree-----------//
        treeItemClick(item: any) {
            if (!('children' in item)) { // for dont select layer group
                if (!this.disableClick) {
                    this.activeItem = item
                    this.$emit('treeClick', item)
                }

            }
        },
        checkBoxChange(data: { value: boolean; id: number }) {
            console.log(data, this.selectResult)
            if (data.value) {
                this.selectResult.push(data.id);
            } else {
                this.selectResult = this.selectResult.filter((e) => e !== data.id);
            }

            this.selectResult = [...new Set(this.selectResult)];
            if (this.fullScreen) {
                this.store.dispatch(OpenLayerAction.SET_SUB_SHOW_LAYERS, this.selectResult)
            } else {
                this.store.dispatch(OpenLayerAction.SET_SHOW_LAYERS, this.selectResult)
            }
            this.clearedInitSelected = true

        },

        layerTransparentChange(item: LayerTree) {
            let map: Map | null = null
            if (this.fullScreen) {
                map = this.store.getters.getSubMap
            } else {
                map = this.store.getters.getMap
            }

            if (map) {
                const layer = map.getAllLayers().filter((layer) => {
                    if (layer.get('name')) {
                        return layer.get('name') === String(item.id)
                    } else {
                        return false
                    }
                })[0]
                if (layer && item.opacity)
                    layer.setOpacity(item.opacity)

            }

        },

        setActiveLayer(item: LayerTree) {
            if (!item.layers && !item.children)
                if (item.children !== null) {

                    const layers: LayerItem[] = this.store.getters.getLayers
                    layers.map((layer) => {
                        if (layer.id === item.id) {
                            if (layer.imported_type !== 'wms') {
                                if (this.fullScreen) {
                                    this.store.commit(OpenLayerMutations.SET_SUB_ACTIVE_LAYER, layer)
                                } else {
                                    this.store.commit(OpenLayerMutations.SET_ACTIVE_LAYER, layer)
                                }

                            } else {
                                this.$toast.add({
                                    group: 'br',
                                    life: 2000,
                                    severity: 'error',
                                    summary: ' خطا در عملیات',
                                    detail: 'این لایه نمیتواند فعال شود'
                                });
                            }

                        }
                    })

                    // ---------zoom to layer ------//
                    this.getLayerExtent(item.id).then((res:string|null)=>{
                        if (res){
                            let map: Map | null = null
                            if (this.fullScreen) {
                                map = this.store.getters.getSubMap
                            } else {
                                map = this.store.getters.getMap
                            }
                            map.getView().fit(res.split(','),{duration:2000,padding:[50,50,50,50]})
                        }
                    })

                }

        },

        layerClustering(item: LayerTree) {
            let clusterLayers: LayerItem[] = []
            if (this.fullScreen) {
                clusterLayers = this.store.getters.getSubClusterLayers
            } else {
                clusterLayers = this.store.getters.getClusterLayers
            }
            if (item.cluster) {

                this.store.getters.getLayers.map((i: LayerItem) => {
                    if (i.id === item.id) {
                        clusterLayers.push(i)
                    }
                })
                if (this.fullScreen) {
                    this.store.commit(OpenLayerMutations.SET_SUB_CLUSTER_LAYERS, clusterLayers)
                } else {
                    this.store.commit(OpenLayerMutations.SET_CLUSTER_LAYERS, clusterLayers)
                }

            } else {
                const new_clusterLayers = clusterLayers.filter((i) => {
                    return i.id !== item.id
                })
                if (this.fullScreen) {
                    this.store.commit(OpenLayerMutations.SET_SUB_CLUSTER_LAYERS, new_clusterLayers)
                } else {
                    this.store.commit(OpenLayerMutations.SET_CLUSTER_LAYERS, new_clusterLayers)
                }
            }

            console.log(this.store.getters.getClusterLayers, 'layers_cluster_change')
            console.log(this.store.getters.getSubClusterLayers, 'layers_sub_cluster_change')
        },
        //--------for tree-----------//
        async openSortDialog() {
            this.sortDialog = true
            await this.layerSortList()
            console.log(this.layerSortListData)

        },
        selectLayer(id: number) {
            this.selected_layer = id
        },
        swapElements(array: ResponseLayerUpload[], index1: number, index2: number) {
            array[index1] = array.splice(index2, 1, array[index1])[0];
        },
        up() {
            if (this.selected_layer) {
                let i = 0
                this.layerSortListData.map((item, index) => {
                    if (item.id === this.selected_layer) {
                        i = index
                    }
                })
                this.swapElements(this.layerSortListData, i, (i - 1))
            }
        },
        down() {
            if (this.selected_layer) {
                let i = 0
                this.layerSortListData.map((item, index) => {
                    if (item.id === this.selected_layer) {
                        i = index
                    }
                })
                this.swapElements(this.layerSortListData, i, (i + 1))
            }
        },
        toTop() {
            if (this.selected_layer) {
                let i = 0
                this.layerSortListData.map((item, index) => {
                    if (item.id === this.selected_layer) {
                        i = index
                    }
                })
                this.swapElements(this.layerSortListData, i, 0)
            }
        },
        toDown() {
            if (this.selected_layer) {
                let i = 0
                this.layerSortListData.map((item, index) => {
                    if (item.id === this.selected_layer) {
                        i = index
                    }
                })
                this.swapElements(this.layerSortListData, i, -1)
            }
        },
        log(event: any) {
            console.log(event)
        },
        async saveSortLayers() {
            console.log(this.layerSortListData)
            const res = await this.saveLayersSort({list: this.layerSortListData})
            if (res) {
                this.toast.add({
                    group: 'tr',
                    life: 2000,
                    severity: 'success',
                    summary: ' نتیجه عملیات',
                    detail: 'تغییرات اعمال شد'
                });
                await this.store.dispatch(OpenLayerAction.SET_LAYERS_SORT, this.toast)
                this.sortDialog = false

            }

        }
    },

    async mounted(): Promise<void> {

        if (!this.fullScreen){
            await this.getLayersTree()
            this.store.commit(OpenLayerMutations.SET_LAYERS_TREE,this.layersTreeList)
        }else {
            this.layersTreeList = this.store.getters.getLayersTree
            if (this.layersTreeList.length == 0){
                await this.getLayersTree()
                this.store.commit(OpenLayerMutations.SET_LAYERS_TREE,this.layersTreeList)
            }

        }


        //----for set init showLayers ----------//

        const init: number[] = []
        if (this.fullScreen){
            this.store.getters.getSubShowLayers.map(async (layer: LayerItem) => {
                init.push(layer.id);
            })
        }else {
            this.store.getters.getShowLayers.map(async (layer: LayerItem) => {
                init.push(layer.id);
            })
        }

        this.initSelected = [...init]
        this.selectResult = [...this.initSelected]

        this.initData = true

        this.store.commit(OpenLayerMutations.ALL_MAP_CONFIG_LOAD,true)

    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.flip-list-move {
    transition: transform 0.5s;
}

.myTree .v-input--density-default {
    --v-input-control-height: 25px !important;
}
</style>
