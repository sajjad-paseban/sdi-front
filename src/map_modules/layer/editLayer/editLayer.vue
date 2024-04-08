<template>
    <div style="width: 100%;height: 100%">
        <div v-if="!mobileLayout" dir="ltr" style=" height: 100%" class="pa-2 rounded-lg " id="editLayerWindow">
            <Splitter style="height: 100%" class="ma-0 pa-0 rounded-lg ">
                <SplitterPanel
                        class=""
                        dir="ltr"
                        :size="82">

                    <v-fade-transition>
                        <template v-if="selectedLayer">
                            <main-edit-layer  v-if="selectMain==='main'" />
                            <main-wms-edit-layer  v-if="selectMain==='wms'" />
                        </template>

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
                        :size="20"
                >
                    <div class="pa-2" style="background-color:#f3f3f3;width: 100%;height: 100%">
                        <layer-tree :disable-click="disableTreeClick" @treeClick="treeClick" class=""></layer-tree>
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
                <template v-if="selectedLayer">
                    <main-edit-layer  v-if="selectMain==='main'" />
                    <main-wms-edit-layer  v-if="selectMain==='wms'" />
                </template>
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
    import {defineComponent, ref} from "vue";

    import Splitter from "primevue/splitter";
    import SplitterPanel from "primevue/splitterpanel";
    import layerTree from "@/map_modules/layer/common/layerTree.vue"
    import mainEditLayer from "@/map_modules/layer/editLayer/editLayerComponent/main.vue"
    import mainWmsEditLayer from "@/map_modules/layer/editLayer/editLayerComponent/wmsMain.vue"
    import extra_layer_functions from "@/componentFunctions/extra_layer_functions";
    import {StoreActions} from "@/store";
    import {useStore} from "vuex";
    import {useRoute} from "vue-router";

    export default defineComponent({
        name: "EditLayer",
        components: {Splitter, SplitterPanel, layerTree, mainEditLayer,mainWmsEditLayer},
        setup(){
            const {layerRetrieve, getLayerRetrieve} = extra_layer_functions()
            const store = useStore()
            const route = useRoute()
            const selectedLayer = ref<any>(null)

            if (route.params.id && typeof route.params.id === 'string') {
                selectedLayer.value = {id:parseInt(route.params.id)}
            }

            return{
                layerRetrieve, getLayerRetrieve,store,selectedLayer
            }
        },
        data() {
            return {
                layerDrawer: false,

                mobileLayout: false,
                selectMain : 'main',
                disableTreeClick:false,


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

            async treeClick(item: any) {
                console.log(item, 'selected layer')
                // this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: true})
                await this.getLayerRetrieve(parseInt(item.id))
                // this.store.dispatch(StoreActions.SET_REQUEST_LOADING, {type: 'simple', active: false})
                if (this.layerRetrieve&&this.layerRetrieve.imported_type==='wms'){
                    this.selectMain = 'wms'
                    this.selectedLayer = item
                    this.disableTreeClick = true
                    this.$router.push({
                        name: 'editWmsLayerConfig',
                        params: {id: item.id}
                    });
                }else {
                    this.selectMain = 'main'
                    this.selectedLayer = item
                    this.disableTreeClick = true
                    this.$router.push({
                        name: 'editLayerConfig',
                        params: {id: item.id}
                    });
                }



                // this.$router.push({name: 'editLayerConfig'})
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
        updated(): void {
            if (this.$route.name === 'editLayer'){
                this.selectedLayer = null
                this.disableTreeClick = false
            }
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
