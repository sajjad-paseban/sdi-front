<template>
    <div class="" style=" height:100%;width:100%">

        <v-card height="100%" width="100%" class="pa-2">
            <div id="table2" class=" elevation-2 rounded-lg border" style="height: 98%;overflow-y:auto ">
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
    </div>

</template>

<script lang="ts">


    import {defineComponent, onMounted, PropType, ref} from "vue";
    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import EditableTable from "@/components/common/editableTable.vue";
    import {AnalyzeRunResult, ProcessOutput} from "@/models/Analyze.interface";

    export default defineComponent({
        name: "ShowTableComponent",
        components: {EditableTable},

        setup(props) {

            const store = useStore()
            const route = useRoute()
            const toast = useToast()
            const router = useRouter()

            const headers = ref<{ text: string, value: string, width: string }[]>([])
            const findFeatures = ref<any[]>([])

            onMounted(()=>{

                headers.value.push({
                    text:'نتیجه',
                    value:'analyzeResult',
                    width:'10%'
                })

                console.log(props.tableFeatures)

                if (props.processOutput === ProcessOutput.Geometry){
                    findFeatures.value = props.tableFeatures.map((feature:any)=>{
                        return {...feature.feature.properties,
                            geometry:feature.feature.geometry,
                            id:feature.feature.id.split('.')[1],
                            analyzeResult:JSON.parse(feature.result)
                        }
                    })
                }else {
                    findFeatures.value = props.tableFeatures.map((feature:any)=>{
                        return {...feature.feature.properties,
                            geometry:feature.feature.geometry,
                            id:feature.feature.id.split('.')[1],
                            analyzeResult:feature.result
                        }
                    })
                }


                // feature.map((feature: any) => {
                //     return {
                //         ...feature.properties,
                //         id: feature.id.split('.')[1]
                //     }
                // })
            })


            return {
                store, router, headers, findFeatures

            }
        },

        data() {
            return {
                // /-------table data---------/
                tableFilterActivate: false,

                height: "", //  برای اندازه ازتفاع جدول //

                // /-------table data---------/
            };
        },
        props: {
            tableFeatures: {
                required: true,
                type: Array as PropType<AnalyzeRunResult[]>
            },
            processOutput:{
                type:String,
                required:true
            }
        },
        methods: {
            screenResizeHandler() {         //  برای اندازه ازتفاع جدول //
                let x: any = document.getElementById("table2");
                this.height = String(x.offsetHeight);
            },
        },
        //  برای اندازه ازتفاع جدول //
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        //  برای اندازه ازتفاع جدول //

        mounted(): void {
            setTimeout(()=>{
                this.screenResizeHandler()
            },1000)
        },

        computed: {},
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
