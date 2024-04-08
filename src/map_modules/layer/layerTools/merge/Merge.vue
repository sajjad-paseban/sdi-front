<template>
    <v-slide-y-transition>
        <div v-if="initData" style="height:100%;width:100%;position: relative" class="pa-2">
            <Fieldset legend="ترکیب کردن لایه">
                <p class="pb-2">
                    در این ابزار امکان ترکیب چند لایه به لایه مد نظر وجود دارد.
                </p>

            </Fieldset>
            <div style="height:20px;width:100%"></div>
            <v-row style="height: calc(100% - 100px);display: flex;align-content: flex-start;}"
                   class="ma-0 pa-0 mt-1 myForm">
                <v-col cols="12" sm="4" class="bg-white pa-2 pb-4 pt-0 px-0 border-t rounded-lg elevation-2"
                       style="height: max-content">
                    <v-row class="ma-0 pa-0  pa-3 py-2 bg-grey-darken-1 rounded-t-lg mb-4">
                        <p class="font-weight-bold" style="font-size: 12px">انتخاب لایه مقصد</p>
                    </v-row>
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12">
                            <v-text-field
                                    density="compact"
                                    variant="solo"
                                    v-model="mainLayer.name"
                                    readonly
                                    required
                            >
                                <template v-slot:prepend-inner>
                                    <v-icon color="primary" icon="mdi-format-color-text"/>
                                </template>

                                <template v-slot:label>
                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                    <p class="">نام لایه انتخابی</p>
                                </template>
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <v-row class="ma-0 pa-0 px-2" style="height:30px">
                        <v-btn @click="searchLayerDialog=true;searchMainLayerDialog=true" class="font-weight-bold" color="primary" variant="tonal" style="height:100%;width:100%">
                            انتخاب لایه
                        </v-btn>
                    </v-row>
                </v-col>
                <v-col class="px-0 pt-0  mt-4 rounded-lg bg-white elevation-2 border-t" cols="12" sm="10"
                       style="height: max-content">
                    <v-row class="ma-0 pa-0  pa-3 py-2 bg-grey-darken-1 rounded-t-lg mb-4">
                        <p class="font-weight-bold" style="font-size: 12px">لایه های انتخاب شده </p>
                    </v-row>
                    <v-row class="pa-0 ma-0 px-3"
                           style="height:100px;display: flex;overflow-x: auto;flex-direction: column-reverse;justify-content: flex-end;align-content: flex-start;">
                        <div v-for="(i,index) in mergeLayers" :key="index" class="rounded-lg elevation-3 ma-2 border-t"
                             style="height: 60px;width:100px;display: flex;align-items: center;position: relative;justify-content: center">
                            <v-btn @click="deleteLayer(index)" density="compact" size="small" color="error" style="position: absolute;left:-8px;top:-6px;z-index: 1001" icon>
                                <v-icon size="small">mdi-close</v-icon>
                            </v-btn>
                            <p class="font-weight-bold text-center" style="font-size: 11px">{{i.name}}</p>
                        </div>

                    </v-row>
                </v-col>
            </v-row>

            <v-btn @click="searchLayerDialog=true;activeLayerSelect=null" class="elevation-4" icon v-tooltip.left="'افزودن لایه'"
                   style="position: absolute;right:30px;bottom:30px">
                <v-avatar size="27" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/add.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>
            <v-btn @click="saveMergeLayers" class="elevation-3" icon color="" v-tooltip.right="'انجام عملیات '"
                   style="position: absolute;left:30px;bottom:30px">
                <v-avatar size="27" class="">
                    <v-img
                            class=""
                            src="@/assets/icons/save.png"
                            alt="John"
                    ></v-img>
                </v-avatar>
            </v-btn>

            <simple-dialog
                    :show="searchLayerDialog"
                    :topic="'انتخاب لایه'"
                    :overLayer="true"
                    width="30vw"
                    height="80vh"
                    @closeDialog="searchLayerDialog = false"
            >
                <v-card height="100%" class="pa-2">
                    <div style="height: calc(100% - 35px)">
                        <layer-tree @treeClick="treeClick" class=""></layer-tree>
                    </div>
                    <v-row class="ma-0 pa-0" justify="end" align="center">
                        <v-btn
                                variant="tonal"
                                prepend-icon="mdi-content-save-move"
                                style="font-weight: bold !important"
                                size="small"
                                color="primary"
                                @click="addMergeLayer"
                                class="elevation-1  rounded-lg mt-2"
                        >انتخاب
                        </v-btn>
                    </v-row>
                </v-card>
            </simple-dialog>
        </div>

    </v-slide-y-transition>

</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import Fieldset from "primevue/fieldset";
import layerTree from "@/map_modules/layer/common/layerTree.vue";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {LayerItem} from "@/store/openLayer/types";
import {LayerTree} from "@/models/Layer.Interface";
import extra_layer_functions from "@/componentFunctions/extra_layer_functions";


export default defineComponent({
    name: "BaseModelsComponent",
    components: {SimpleDialog, layerTree, Fieldset},

    setup() {

        const initData = ref(false)
        const store = useStore()

        const {layerToolsMerge} = extra_layer_functions()

        onMounted(async () => {

            setTimeout(() => {
                initData.value = true
            }, 200)
        })
        return {
            initData, store,layerToolsMerge
        }
    },
    data() {
        return {
            searchLayerDialog:false,
            mergeLayers:[] as LayerTree[],
            activeLayerSelect:null as LayerTree|null,
            mainLayer:{name:''} as LayerTree,
            searchMainLayerDialog:false
        };
    },
    props: {},
    watch: {},
    methods: {
        treeClick(item:LayerTree){
            if (!item.is_service){
                this.activeLayerSelect = item
            }else {
                this.$toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'لایه نمیتواند از نوع سرویس باشد'
                });
            }
        },
        deleteLayer(index){
            this.mergeLayers.splice(index,1)
        },
        addMergeLayer(){
            if (this.activeLayerSelect){
                if (this.searchMainLayerDialog){
                   this.mainLayer =  this.activeLayerSelect
                    this.searchMainLayerDialog = false
                }else {
                    this.mergeLayers.push(this.activeLayerSelect)
                }
                this.searchLayerDialog=false
            }else {
                this.$toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'لایه ای انتخاب نشده است'
                });
            }
        },

        async saveMergeLayers() {
            if (this.mainLayer.id && this.mergeLayers.length > 0) {
                const layers = this.mergeLayers.map((item) => {
                    return item.id
                })

                const res = await this.layerToolsMerge({main_layer: this.mainLayer.id, layers: layers})

                if (res) {
                    this.$toast.add({
                        group: 'tr',
                        life: 2000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'تغیرات ذخیره شد'
                    });
                }
            } else {
                this.$toast.add({
                    group: 'br',
                    life: 2000,
                    severity: 'error',
                    summary: ' خطا',
                    detail: 'اطلاعات تکمیل نیست'
                });
            }
        }
    },

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
