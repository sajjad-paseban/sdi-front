<template>
    <div class="elevation-1 rounded-lg py-3 pr-1 pl-1  elevation-3"
         style="background-color:white;width: 100%;height: 100%;overflow-y: auto">

        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
            <v-fade-transition>
                <v-progress-circular
                        :size="50"
                        color="primary"
                        indeterminate
                ></v-progress-circular>
            </v-fade-transition>
        </v-row>

            <template  v-if="initData">
                <div style="width: 100%;height: 100%">
                    <Tree1

                            v-for="item in layersTreeList"
                            :key="item.id"
                            :item="item"
                            :activeCheckBox="false"
                            :itemClick="treeItemClick"
                            :label="'name'"
                            :active-item="activeItem"
                            :image="'image'"
                            dir="rtl"
                            key-object="id"
                    ></Tree1>
                </div>
            </template>




    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import Tree1 from "@/components/common/tree.vue";
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";


    interface Item {
        label: string;
        to: string;
        des: string;
    }

    export default defineComponent({
        name: "layerTree",
        components: {Tree1},
        setup() {
            const {getLayersTree, layersTreeList} = extra_layer_functions()

            const initData = ref(false)
            onMounted(async () => {
                await getLayersTree()

                setTimeout(() => {
                    initData.value = true
                }, 300)

            })
            return{
                initData,layersTreeList
            }
        },
        data() {
            return {
                //--------for tree-----------//
                selectResult: [] as string[],
                activeItem: null as Item | null
                //--------for tree-----------//
            };
        },
        directives: {},

        props: {
            disableClick:{
                default:false,
                required:false
            }
        },
        emits:['treeClick'],
        methods: {
            //--------for tree-----------//
            treeItemClick(item: any) {
                if(!('children' in item)){ // for dont select layer group
                    if (!this.disableClick){
                        this.activeItem = item
                        this.$emit('treeClick', item)
                    }

                }

            },
            //--------for tree-----------//
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
