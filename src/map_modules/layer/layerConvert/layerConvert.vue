<template>
    <div style="width: 100%;height: 100%">
        <div v-if="!mobileLayout" dir="ltr" style=" height: 100%" class="pa-2 rounded-lg " id="editLayerWindow">
            <Splitter style="height: 100%" class="ma-0 pa-0 rounded-lg elevation-3">
                <SplitterPanel
                        class=""
                        dir="ltr"
                        :size="82">

                    <v-fade-transition>
                        <main-info-layer v-if="selectedLayer"/>
                        <div style="height: 100%;width: 100%;" v-else>
                            <div style="height: 100%;width: 100%;">

                                <v-img
                                        src="@/assets/gifs/selectWating.gif"
                                        height="100%"
                                        width="100%"
                                        cover

                                ></v-img>
                            </div>
                            <v-row justify="center" align="center"
                                   style="position: absolute;height: 50%;width: 82%;left: 0;top:0;z-index: 100">
                                <v-col cols="12" class="text-center">
                                    <p style="" class="text-center font-weight-bold">ابتدا لایه را انتخاب کنید</p>
                                </v-col>
                            </v-row>

                        </div>
                    </v-fade-transition>

                </SplitterPanel>

                <SplitterPanel
                        dir="ltr"
                        class=""
                        style="overflow-y: auto !important; min-width: 55px !important"
                        :size="17"
                >
                    <div class="pa-2" style="background-color:#f3f3f3;width: 100%;height: 100%">
                        <layer-tree @treeClick="treeClick" class=""></layer-tree>
                    </div>

                </SplitterPanel>
            </Splitter>
        </div>

        <div v-if="mobileLayout" dir="rtl" style=" height: 100%" class="pa-2 rounded-lg ">
            <v-app-bar class="" height="50" :elevation="2" density="compact">
                <v-btn
                        class="mr-n1 mt-1"
                        icon
                        variant="text"
                        color="primary"
                        size="small"
                        @click="layerDrawer = !layerDrawer"

                >
                    <v-icon>mdi mdi-layers</v-icon>
                </v-btn>
            </v-app-bar>

            <v-navigation-drawer
                    v-model="layerDrawer"
                    class="rounded-lg elevation-2"
                    temporary
            >
                <layer-tree @treeClick="treeClick" class=""></layer-tree>
            </v-navigation-drawer>

            <v-fade-transition>
                <main-info-layer v-if="selectedLayer"/>
                <div style="height: 100%;width: 100%;" v-else>
                    <div style="height: 100%;width: 100%;">

                        <v-img
                                src="@/assets/gifs/selectWating.gif"
                                height="100%"
                                width="100%"
                                cover

                        ></v-img>
                    </div>
                    <v-row justify="center" align="center"
                           style="position: absolute;height: 50%;width: 100%;left: 0;top:0;z-index: 100">
                        <v-col cols="12" class="text-center">
                            <p style="" class="text-center font-weight-bold">ابتدا لایه را انتخاب کنید</p>
                        </v-col>
                    </v-row>

                </div>
            </v-fade-transition>
        </div>
    </div>


</template>

<script lang="ts">
    import {defineComponent} from "vue";

    import Splitter from "primevue/splitter";
    import SplitterPanel from "primevue/splitterpanel";
    import layerTree from "@/map_modules/layer/layerConvert/layerConvertComponent/layerTree.vue"
    import mainInfoLayer from "@/map_modules/layer/layerConvert/layerConvertComponent/main.vue"

    export default defineComponent({
        name: "LayerConvert",
        components: {Splitter, SplitterPanel, layerTree, mainInfoLayer},
        data() {
            return {
                layerDrawer: false,

                mobileLayout: false,

                selectedLayer: null


            };
        },
        directives: {},
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        props: {},

        methods: {

            treeClick(item: any) {
                this.selectedLayer = item
            },


            screenResizeHandler() {

                let x: any = document.getElementById("editLayerWindow");
                const height = parseInt(x.offsetWidth);
                this.mobileLayout = height < 700;

            },


        },
        mounted(): void {
            this.screenResizeHandler()
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
