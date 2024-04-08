<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class=" myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p class="font-weight-bold pr-4 header_font">خروجی فیلتر لایه</p>

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
                <v-row class="pa-0 ma-0 "
                       style="overflow-y: auto;height: 100%"
                       justify="center" align="center">
                    <v-col cols="12" sm="9" id="table" style="height: 90%">
                        <EditableTable
                                ref="editTable"
                                :headers="headers"
                                :items="features"
                                :checkBox="false"
                                :height="height"
                                :filter-activate="tableFilterActivate"

                                style="background-color: white"
                        ></EditableTable>

                    </v-col>
                </v-row>
            </v-fade-transition>

        </div>
        <v-divider></v-divider>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, PropType, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import EditableTable from "@/components/common/editableTable.vue";
    import {FeatureResult, FilterTypes, LayerInputData, LayerInputFilters} from "@/models/Analyze.interface";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import source_functions from "@/components/openLayers/componentFunctions/source";
    import {FilterResult} from "@/api/analyze/SD.Models/filterResult.sd";
    import {any} from "zod";
    import {LayerItem} from "@/store/openLayer/types";


    export default defineComponent({
        name: "SetModelProcessComponent",
        components: {EditableTable},
        setup(props) {
            const store = useStore()
            const router = useRouter()

            const {filterResultFeatures, getFilterResult} = analyze_functions()
            const {featureToJson} = source_functions()
            const features = ref<FeatureResult[]>([])
            const featuresLayer = ref<any>({})

            const layerInputResult = ref<FilterResult[]>()

            const initData = ref(false)

            onMounted(async () => {
                console.log(props.layerInputData, 'layerInputData in feature result')

                if (props.layerInputData && props.layerInputData.filters) {
                    const data = setFilterResultInput(props.layerInputData)
                    layerInputResult.value = data
                    for (let item = 0; item < data.length; item++) {
                        await getFilterResult(data[item])
                        features.value = [...features.value, ...filterResultFeatures.value]
                    }
                }

                featuresToTableItems(features.value)

                let index = 1
                features.value.map((feature)=>{
                    feature.layer = featuresLayer.value[feature.id.split('.')[0]]
                    feature.index = index
                    index++
                })


                setTimeout(() => {
                    initData.value = true
                }, 200)
            })

            function setFilterResultInput(layerInput: LayerInputData): FilterResult[] {

                const result: FilterResult[] = []

                layerInput.layers.map((layer) => {
                    const layerFilters = layerInput.filters?.filter((filter) => {
                        return filter.layer_id === layer.id
                    })

                    const res = {
                        layer: layer.id,
                        filter_objects: [] as any[]
                    }

                    layerFilters?.map((data) => {
                        let value: any = null
                        if (data.filter?.filter_type === FilterTypes.Geometry) {
                            value = JSON.stringify(JSON.parse(featureToJson(data.filter_value[0])).geometry)
                        } else {
                            value = String(data.filter_value)
                        }
                        res.filter_objects.push({
                            filter_object: data.filter ? data.filter.id : 0,
                            layer_field: data.field ? data.field.name : '',
                            value: value
                        })
                    })

                    result.push(res)
                })
                return result
            }

            function featuresToTableItems(features: FeatureResult[]) {
                const layers_tableName: string[] = []
                features.map((feature) => {
                    const table_name = feature.id.split('.')[0]
                    if (layers_tableName.indexOf(table_name) === -1) {
                        layers_tableName.push(table_name)
                    }
                })

                layers_tableName.map((table) => {
                    store.getters.getLayers.map((layer: LayerItem) => {
                        if (layer.table_name === table) {
                            featuresLayer.value[table] = layer.name
                        }
                    })
                })
            }

            return {
                store, router, initData,features,layerInputResult
            }
        },
        props: {
            layerInputData: {
                type: Object as PropType<LayerInputData | null>,
                required: true
            }
        },
        data() {
            return {


                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                headers: [
                    {text: "ردیف", value: "index", width: "10%"},
                    {text: "آیدی", value: "id", width: "30%"},
                    {text: "لایه", value: "layer", width: "30%"},

                ],


                // /-------table data---------/

            };
        },

        methods: {
            screenResizeHandler() {
                let x: any = document.getElementById("table");
                this.height = String(x.offsetHeight - 20);
            },
            nextPageFunc(){
                return {
                    result:true,
                    data:this.layerInputResult
                }
            }
        },
        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //
        watch: {
            initData() {
                if (this.initData) {
                    this.screenResizeHandler()
                }
            }
        },

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
