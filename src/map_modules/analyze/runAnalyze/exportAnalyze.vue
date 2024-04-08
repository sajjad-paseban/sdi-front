<template>
    <div class="" style=" height:100%;width:100%">
        <v-row class="ma-0 pa-0" style="height:100%" justify="center" align="center">

            <v-table style="min-width: 50%"
                     class="border elevation-3 rounded-lg " density="compact">
                <thead>

                </thead>
                <tbody>
                <tr
                        v-for="(value, name, index) in table_data" style="height: 50px"
                        :key="index"
                >
                    <td class="font-weight-bold" style="color: blue;font-size:11px!important">{{ name}}</td>
                    <td class="font-weight-bold">{{ value}}</td>


                </tr>
                </tbody>
            </v-table>

        </v-row>
    </div>

</template>

<script lang="ts">


    import {defineComponent, onMounted, PropType, ref} from "vue";
    import {useStore} from "vuex";
    import {useRoute, useRouter} from "vue-router";
    import {useToast} from "primevue/usetoast";
    import EditableTable from "@/components/common/editableTable.vue";
    import {AnalyzeExportType, AnalyzeListItem, AnalyzeRunResult, ProcessOutput} from "@/models/Analyze.interface";
    import axios from "axios";
    import JSZip from "jszip";
    import analyze_functions from "@/componentFunctions/analyze_functions";

    export default defineComponent({
        name: "ExportAnalyzeComponent",
        components: {},

        setup(props) {

            const store = useStore()
            const route = useRoute()
            const toast = useToast()
            const router = useRouter()

            const {analyze_export_file} = analyze_functions()

            const table_data = ref<any>({})

            onMounted(async () => {

                console.log(props.analyze_model,'analyze_model')

                const link = await analyze_export_file(props.analyze_model.id)

                table_data.value['نوع خروجی'] = props.analyze_model.export_type
                if (props.analyze_model.export_type === AnalyzeExportType.File)
                    table_data.value['نوع خروجی فایل'] = props.analyze_model.export_file_type

                table_data.value['لینک دانلود'] = link


            })
            return {
                store, router, table_data

            }
        },

        data() {
            return {};
        },
        props: {
            analyze_model: {
                type: Object as PropType<AnalyzeListItem>,
                required: true
            }
        },
        methods: {},

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
