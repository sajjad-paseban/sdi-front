<template>
    <div>
        <vector_layer :visible="showVectorLayer"  :map="map">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">

                    <template v-if="true" #select="{vectorSource}">
                        <select_interaction ref="selectInteractionRef" @selected="selectedEvent" :map="map"
                                            :source="vectorSource" :vector="vector"></select_interaction>
                    </template>

                </vector_source>
            </template>

            <template v-if="true" #style="{vector}">
                <Text_style :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'" :line-color="'rgb(38,179,241)'"
                            :vector="vector"></Text_style>
            </template>
        </vector_layer>

        <vector_layer :map="map" :z-index="11">
            <template #clusterSource="{vector}">
                <cluster_source :layers="''" ref="drawClusterSourceRef" :map="map" :vector="vector">

                </cluster_source>
            </template>

        </vector_layer>

        <popupWindow @resize="screenResizeHandler()" :close-btn="true" v-if="winSize!==0&&findFeatures.length>0&&findFeaturesDialog" :resize="true"
                     :top="winSize>500?'10px':'10px'"
                     :left="winSize>500?'10px':'40px'" :max_width="winSize>500?'100vw':'100vw'"
                     :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                     :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'30vh':'30vh'"
                     :width="winSize>500?'25vw':'80vw'" @closeWindow="findFeaturesDialog = true">
            <v-card height="100%" width="100%" class="pa-2">
                <div id="table2" class=" elevation-2 rounded-lg border" style="height: 100%">
                    <v-fade-transition>
                        <EditableTable
                                v-if="headers.length>0"
                                ref="editTable"
                                :headers="headers"
                                class="rounded-lg"
                                :items="findFeatures"
                                @itemClick="featureClick"
                                :checkBox="false"
                                :height="height"
                                :filter-activate="tableFilterActivate"
                                style="background-color: white"
                        ></EditableTable>
                    </v-fade-transition>
                </div>
            </v-card>
        </popupWindow>

        <popupWindow :close-btn="true" v-if="winSize!==0&&selectFeatureInfo" :resize="true"
                     :top="winSize>500?'40vh':'40vh'"
                     :left="winSize>500?'60px':'70px'" :max_width="winSize>500?'100vw':'100vw'"
                     :min_width="winSize>500?'153px':'30px'" :max_height="winSize>500?'100vh':'100vh'"
                     :min_height="winSize>500?'20px':'40px'" :height="winSize>500?'20vh':'20vh'"
                     :width="winSize>500?'20vw':'50vw'" @closeWindow="selectFeatureInfo=null">
            <v-card height="100%" width="100%" class="pa-2" style="">
                <v-card class="rounded-lg" style="height:100%;width: 100%;overflow-y: auto;overflow-x: auto">
                    <v-table density="compact">
                        <thead>

                        </thead>
                        <tbody>
                        <tr
                                v-for="(value, name, index) in selectFeatureInfo"
                                :key="index"
                        >
                            <td class="font-weight-bold text-blue-darken-4 bg-grey-lighten-4">{{ name}}</td>
                            <td class="font-weight-black">{{ value }}</td>
                        </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-card>
        </popupWindow>

        <v-scale-transition>
            <v-btn
                    icon
                    v-if="findFeatures"
                    size="small"
                    @click="showVectorLayer=!showVectorLayer"
                    class="elevation-3"
                    style="font-weight: bold !important;position: absolute;top:10px;right:20px;z-index:100"
                    v-tooltip.left="'نمایش اضلاع'"
            >
                <v-avatar size="40" class=" pa-2">
                    <v-img
                            class=""
                            src="@/assets/icons/see.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>

        </v-scale-transition>


    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType, ref} from "vue";
    import Map from 'ol/Map.js';
    import Feature from 'ol/Feature.js';
    import {useStore} from "vuex";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import cluster_source from "@/components/openLayers/sources/cluster/Cluster.vue";
    import {default as select_interaction} from "@/components/openLayers/interactions/select/Select.vue";
    import {SelectEvent} from "ol/interaction/Select";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {ClusterSourceInterface} from "@/components/openLayers/sources/cluster/clusterSource.interface";
    import {SelectComponentInterface} from "@/components/openLayers/interactions/select/model";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import popupWindow from "@/components/common/popupWindow.vue";
    import EditableTable from "@/components/common/editableTable.vue";


    export default defineComponent({
        name: "showFeaturesWithClickComponent",
        components: {
            vector_layer,
            Text_style,
            vector_source,
            cluster_source,
            select_interaction,
            popupWindow,
            EditableTable
        },

        props: {

            map: {
                required: true,
                type: Map,
            },

            features: {
                type: Array as PropType<JSON[]>,
                required: true
            },
            fieldShow: {
                required: false,
                type: Object as PropType<{ field: string, nameShow: string }>
            }


        },

        setup(props) {
            const store = useStore()

            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const drawClusterSourceRef = ref<ClusterSourceInterface>()
            const selectInteractionRef = ref<SelectComponentInterface>()
            const {addFeature} = source_functions()

            const headers = ref<{ text: string, value: string, width: string }[]>([])
            const findFeatures = ref<any[]>([])
            const findFeaturesDialog = ref(false)
            const selectFeature = ref<Feature | null>(null)
            const selectFeatureInfo = ref<{ [key: string]: any } | null>(null)
            const height = ref("") //  برای اندازه ازتفاع جدول //

            function screenResizeHandler() {         //  برای اندازه ازتفاع جدول //
                let x: any = document.getElementById("table2");
                height.value = String(x.offsetHeight);

            }

            onMounted(() => {
                setTimeout(() => {
                    if (props.features && drawVectorSourceRef.value && drawClusterSourceRef.value) {
                        addFeature(drawVectorSourceRef.value.getSource(), props.features)
                        drawClusterSourceRef.value.drawFeature(props.features)

                        findFeatures.value = props.features.map((feature: any) => {
                            return {
                                ...feature.properties,
                                id: feature.id.split('.')[1]
                            }
                        })

                        findFeaturesDialog.value = true
                        setTimeout(()=>{
                            screenResizeHandler()
                        },1000)



                    }
                }, 1000)

            })

            return {
                store,
                drawClusterSourceRef,
                drawVectorSourceRef,
                selectInteractionRef,
                headers,
                findFeatures,
                findFeaturesDialog,
                selectFeature,
                selectFeatureInfo,
                height,
                screenResizeHandler

            }
        },

        computed: {
            winSize() {
                return window.innerWidth
            },
        },

        data() {
            return {
                showVectorLayer:false,

                // /-------table data---------/
                tableFilterActivate: false,



                // /-------table data---------/
            };
        },


        methods: {
            selectedEvent(event: SelectEvent) {
                this.selectFeature = event.selected[0]
            },



            featureClick(feature: any) {
                if (feature.id) {
                    if (this.drawVectorSourceRef) {
                        this.drawVectorSourceRef.getFeatures().map((f) => {
                            if (f.get('pk') && f.get('pk') == feature.id) {
                                this.selectFeature = f
                                this.selectInteractionRef?.setSelect([f])
                            }
                        })
                    }
                }
            },
        },

        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        watch: {
            findFeatures() {
                if (this.findFeatures.length > 0) {
                    this.headers = []
                    this.headers.push({
                        text: 'آیدی',
                        value: 'id',
                        width: "20%"
                    })
                    if (this.fieldShow) {
                        this.headers.push({
                            text: this.fieldShow.nameShow,
                            value: this.fieldShow.field,
                            width: "60%"
                        })
                    }


                }
            },

            selectFeature() {
                if (this.selectFeature) {
                    const geometry = this.selectFeature.getGeometry()
                    this.selectFeatureInfo = this.selectFeature.getProperties()
                    if (geometry) {
                        this.map.getView().fit(geometry.getExtent(), {
                            maxZoom: 19,
                            padding: [100, 100, 100, 100],
                            duration: 1000
                        })
                    }
                }
            },
            selectFeatureInfo() {
                if (this.selectFeatureInfo) {
                    delete this.selectFeatureInfo.geometry
                }
            }
        }

        //  برای اندازه ازتفاع جدول //


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > td {
        font-size: 10px !important;
    }

    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > tbody > tr > th,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > th,
    .v-table > .v-table__wrapper > table > tfoot > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > th {
        padding: 3px 8px !important;
    }

    .v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
        height: 21px !important;
    }
</style>
