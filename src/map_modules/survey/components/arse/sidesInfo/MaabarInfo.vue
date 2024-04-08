<template>
    <div style="height:100%;width:100% " class="pa-2 bg-grey-lighten-2">
        <v-row class="pa-0 ma-0" style="height:100%" justify="center" align="center">
            <v-col cols="12" sm="10" id="table" style="height:80%" class="myForm rounded-lg elevation-3 pa-2 bg-white">
                <v-checkbox @update:model-value="(value:boolean)=>{
                    $emit('main_maabar',value)
                }" v-model="main_maabar" label=" معبر اصلی" color="info"
                            class="font-weight-bold"></v-checkbox>
                <v-table class="border rounded pa-2" density="compact"
                         style="height: calc(100% - 45px);overflow-y: auto">

                    <tbody>
                    <tr
                            v-for="(value, index) in headers"
                            :key="index"
                    >
                        <td class="text-blue-darken-3 font-weight-bold">{{ value }}</td>
                        <td class="font-weight-bold">{{ items[index] }}</td>
                    </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>

    </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";

import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {default as map} from "ol/Map";
import {District} from "@/models/Survey.interface";


export default defineComponent({
    name: "MaabarInfoComponent",

    components: {},

    props: {
        side: {
            type: Object as PropType<District | null>,
            required: true
        }


    },

    setup(props) {
        const store = useStore();
        const toast = useToast()


        return {
            store, toast
        }
    },

    data() {
        return {
            headers: [] as string[],
            items: [] as any[],

            main_maabar: false,
        }
    },
    methods: {},


    mounted(): void {
        if (this.side) {
            this.headers = ['طول معبر', 'عرض معبر']
            const maabar_props: any = this.side.maabar_feature_json

            console.log(maabar_props)

            this.items = [this.side.maabar_long, this.side.maabar_lat]

            if (maabar_props.properties) {
                Object.keys(maabar_props.properties).forEach((key) => {
                    this.headers.push(key)
                });
                Object.values(maabar_props.properties).forEach((value) => {
                    this.items.push(value)
                    console.log(value)
                });
            }

            console.log(this.items)
            // -------
            if (this.side.main_maabar) {
                this.main_maabar = this.side.main_maabar
            }
        }
    }

});
</script>


<style scoped>

.v-table > .v-table__wrapper > table > tbody > tr > td,
.v-table > .v-table__wrapper > table > thead > tr > td,
.v-table > .v-table__wrapper > table > tfoot > tr > td {
    font-size: 12px !important;
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

.v-table--density-compact > .v-table__wrapper > table > tbody > tr > th, .v-table--density-compact > .v-table__wrapper > table > thead > tr > th, .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > th {
    /* height: calc(var(--v-table-header-height) - 16px); */
    height: 30px !important;
    font-size: 13px !important;
    color: #0461be !important;
}
</style>
