<template>
    <div
            style="width: 100%;height: 100%;overflow-x: auto" class="rounded-lg">

        <div style="height: calc(100%);width: max-content;min-width: 100%;background-color:white;overflow-y: auto;overflow-x: hidden"
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

            <template v-if="initData">
                <v-fade-transition v-for="item in archiveGroupList" :key="item.id">
                    <Tree1
                            :key-object="'id'"
                            :item="item"
                            class="pr-2 rounded-lg"
                            :activeCheckBox="false"
                            :active-item="activeItem"
                            @checkBoxChange="checkBoxChange"
                            :itemClick="treeItemClick"
                            :label="'title'"
                            :image="'image'"
                            dir="rtl"
                    >
                    </Tree1>
                </v-fade-transition>

            </template>


        </div>


    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch} from "vue";
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
import survey_functions from "@/componentFunctions/survey_functions";
import {ArchiveGroup} from "@/models/Survey.interface";


interface Item {
    label: string;
    to: string;
    des: string;
}

export default defineComponent({
    name: "layerTree",
    components: {Tree1},
    emits:['treeClick'],
    setup(props,{ emit }) {

        const store = useStore()
        const initData = ref(false)
        const toast = useToast()



        const selectResult = ref<number[]>([])



        onMounted(async () => {
            initData.value = true
        })


        return {

            initData,
            store,
            toast,
            selectResult
        }
    },
    data() {
        return {
            //--------for tree-----------//
            // selectResult: [] as number[],
            // initSelected: [] as number[],
            activeItem: null as Item | null,
            //--------for tree-----------//


        };
    },
    directives: {},

    props: {
        disableClick: {
            default: false,
            required: false
        },

        groupSelect: {
            default: false,
            required: false
        },
        archiveGroupList: {
            type:Array as PropType<ArchiveGroup[]>,
            required: true
        },

    },

    methods: {
        //--------for tree-----------//
        treeItemClick(item: any) {
            if (!this.groupSelect) {
                if (!('children' in item)) { // for dont select layer group
                    if (!this.disableClick) {
                        this.activeItem = item
                        this.$emit('treeClick', item)
                    }
                }
            } else {
                if (!this.disableClick) {
                    this.activeItem = item
                    this.$emit('treeClick', item)
                }
            }

        },
        checkBoxChange(data: { value: boolean; id: number }) {
            console.log(data, this.selectResult)
            // if (data.value) {
            //     this.selectResult.push(data.id);
            // } else {
            //     this.selectResult = this.selectResult.filter((e) => e !== data.id);
            // }
            //
            // this.selectResult = [...new Set(this.selectResult)];


        },


        //--------for tree-----------//

    },


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
