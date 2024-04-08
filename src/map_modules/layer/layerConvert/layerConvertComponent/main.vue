<template>

    <div style="background-color:#f3f3f3;width: 100%;height: 100%" dir="rtl" class="pa-1 px-2 pt-0 mt-n1">
        <div style="height: 100%">
            <v-row class="ma-0 pa-0">
                <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-2 mt-2">تبدیل
                    لایه
                </v-btn>
            </v-row>
            <div class="rounded-lg mt-n4 pt-4 elevation-3"
                 style="width: 100%;height: calc(100% - 22px);">

                <div style="width: 100%;height:100%;" class="pa-3">
                <v-row justify="center" align="center" class="pa-0 ma-0 myForm" style="width: 100%;height: 100%">
                    <v-col cols="12">
                        <v-row justify="center" class="ma-0 pa-0 ">
                            <v-col cols="12" sm="4">
                                <v-autocomplete

                                        :items="['point','lineString','Polygon','MultiPolygon','MultiLine']"
                                        density="compact"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">فرمت خروجی</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>
                        <v-row justify="center" class="ma-0 pa-0 mt-3">
                            <v-btn
                                    variant="tonal"
                                    prepend-icon="mdi-reload"
                                    style="font-weight: bold !important"
                                    rounded="lg"
                                    size="small"
                                    class="mt-1"
                                    color="primary"


                            >
                                تبدیل
                            </v-btn>
                        </v-row>
                    </v-col>



                </v-row>
                </div>


            </div>

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";


    export default defineComponent({
        name: "MainExportLayer",
        data() {
            return {}
        },
        methods: {}

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
