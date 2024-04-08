<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class=" myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p class="font-weight-bold pr-4 header_font">انتخاب لایه</p>

            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 49px) ;overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-row v-if="false" class="pa-0 ma-0 rounded-lg "
                       style="overflow-y: auto;height: 100%"
                       justify="center" align="center">
                    <v-col cols="12" class="p-2 rounded-lg" sm="6" style="height:80%">

                    </v-col>

                </v-row>
                <v-row class="pa-0 ma-0 rounded-lg "
                       style="height: 100%"
                       justify="center" align="center">
                    <v-col cols="12" class="rounded-lg " sm="8" style="height:95%">
                        <div style="width:100%;height:100%" class="elevation-3 rounded-lg">
                            <v-tabs class="rounded-t-lg bg-blue-lighten-5" v-model="tab" color="info" show-arrow
                                    @update:modelValue="changeTab">
                                <v-tab :value="item.route" v-for="item in items" :key="item.text">
                                    <!-- <v-icon>mdi-{{ item.icon }}</v-icon> -->
                                    {{ item.text }}
                                </v-tab>
                            </v-tabs>

                            <v-window v-model="tab" style="height: calc(100% - 31px);width: 100%;">

                                <div v-show="tab==='layer'" style="height: 100%;width:100%;" class="bg-white rounded-b-lg">
                                    <div class="pa-0 ma-0 border-b "
                                         style="height:40px;overflow-x: auto;white-space: nowrap;align-items:center;display: flex">

                                        <div v-for="(layer,index) in selectedLayers" :key="index" style="position: relative; font-size: 9px;height:22px"
                                           class="mx-2 pa-1 px-2 font-weight-bold rounded-pill bg-blue-lighten-4 elevation-3">
                                                <v-icon @click="removeLayer(index)" color="error" icon class="bg-white rounded-lg" style="cursor: pointer; position: absolute;left:-5px;top:-4px">mdi-minus-circle-outline</v-icon>
                                            {{layer.name}}
                                        </div>

                                    </div>
                                    <v-row class="ma-0 pa-0" style="height:calc(100% - 40px);overflow-y: auto">
                                        <layer-tree @treeClick="treeClickForSelectLayer"
                                                    class="rounded-lg"></layer-tree>
                                    </v-row>

                                </div>
                                <div v-show="tab==='api_layer'" style="height: 100%;width:100%;" class="bg-white rounded-b-lg">
                                       <v-row class="ma-0 pa-0 " justify="center" align="center" style="height:100%">
                                           در حال توسعه
                                       </v-row>

                                </div>
                            </v-window>
                        </div>

                    </v-col>

                </v-row>
            </v-fade-transition>

        </div>

    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import layerTree from "@/map_modules/layer/common/layerTree.vue";
    import {LayerItem} from "@/store/openLayer/types";
    import {LayerInputData} from "@/models/Analyze.interface";
    import {useToast} from "primevue/usetoast";


    export default defineComponent({
        name: "SelectLayerComponent",
        components: {layerTree},
        setup(props) {
            const store = useStore()
            const router = useRouter()
            const toast = useToast()

            onMounted(()=>{
                console.log(props.layerInputData,'layerInputData in select layer')
            })

            return {
                store, router,toast
            }
        },
        data() {
            return {
                selectedLayers: [] as LayerItem[],
                initData: false,


                //-------------tab---------------//
                tab: "layer",

                items: [
                    {
                        icon: "phone",
                        text: "انتخاب لایه",
                        route: "layer",
                    },
                    {
                        icon: "phone",
                        text: "api لایه",
                        route: "api_layer",
                    },


                ],
                //-------------tab---------------//

            };
        },
        props: {
            layerInputData:{
                type:Object as PropType<LayerInputData|null>,
                required:true
            }
        },
        methods: {
            treeClickForSelectLayer(item: any) {
                this.store.getters.getLayers.map((layer: LayerItem) => {
                    if (layer.id === item.id) {
                        if (this.selectedLayers.indexOf(layer) === -1)
                            if (layer.service_profile){
                                this.toast.add({
                                    group: 'br',
                                    life: 2000,
                                    severity: 'error',
                                    summary: ' خطا در عملیات',
                                    detail: 'لایه نمیتواند سرویس باشد'
                                });
                            }else {
                                this.selectedLayers.push(layer)
                            }

                    }

                })
            },


            removeLayer(index:number){
                this.selectedLayers.splice(index,1)
            },

            nextPageFunc(){
                if (this.selectedLayers.length === 0 ){
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'لایه ای انتخاب نشده است'
                    });
                    return {
                        result:false,
                        data:null
                    }
                }else{
                    const res:LayerInputData  = {
                        layers:this.selectedLayers
                    }
                    return {
                        result: true,
                        data:res
                    }
                }

            },

            changeTab() {
                console.log(this.tab)
            }

        },
        mounted(): void {
            setTimeout(() => {
                this.initData = true
            }, 500)
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (max-width: 600px) {
        .header_font {
            font-size: 10px;
        }
    }
</style>
