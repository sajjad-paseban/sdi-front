<template>
    <div
            class="pa-1"
            style="width: 100%; height: 100%; background-color: #f3f3f33b"
    >
        <div dir="ltr" style="padding-top: 10px; height: 100%">
            <Splitter style="height: 100%" class="ma-0 pa-0">
                <SplitterPanel
                        class="rounded-lg"
                        dir="rtl"
                        :size="80"
                        style="
            background-color: rgb(243, 243, 243);
            overflow-y: auto !important;
          "
                >
                    <v-row class="ma-0 pa-0 px-2 pt-2 mysub">
                        <p style="font-size: 10px; line-height: 20px">
                            در این بخش میتوانید برای هر نقش تنظیمات نقشه متفاوتی داشته باشید.
                        </p>
                    </v-row>
                    <v-fade-transition>
                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-row>
                    </v-fade-transition>

                    <v-fade-transition>

                        <v-row
                                v-if="initShow"
                                class="ma-0 pa-0"
                                style="height: calc(100% - 30px); min-height: 350px; min-width: 300px"
                                align="center"
                        >
                            <v-spacer></v-spacer>

                            <div
                                    class="pa-1 rounded-lg bg-background elevation-1"
                                    style="width: 80%;min-height: 90%; position: relative; height: 100%;overflow-y: auto"
                            >
                                <v-row class="ma-0 pa-0 myForm">
                                    <v-col cols="2" class="mysub">
                                        <p
                                                style="
                        font-size: 10px;
                        white-space: nowrap;
                        margin-top: 8px;
                      ">
                                            انتخاب نقش :
                                        </p>
                                    </v-col>
                                    <v-col cols="5">
                                        <v-autocomplete
                                                :items="rolesWithParentName"
                                                item-title="name"
                                                item-value="id"
                                                density="compact"
                                                v-model="mapConfig['role']"
                                                variant="solo"
                                                @update:modelValue="selectRole"
                                                required
                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام نقش</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-divider class="mb-2" inset/>

                                </v-row>
                                <v-form :disabled="!mapConfig['role']" ref="myAddMapConfig" class="myForm "
                                        style="min-height:calc(100% - 105px);width: 100%;">
                                    <v-row class="pa-0 ma-0">
                                        <v-col cols="2" class="mysub">
                                            <p
                                                    style="
                        font-size: 10px;
                        white-space: nowrap;
                        margin-top: 8px;
                      "
                                            >
                                                نقطه مرکزی نقشه :
                                            </p>
                                        </v-col>
                                        <v-col cols="5">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    :rules="floatRule"
                                                    type="number"
                                                    v-model="mapConfig['centerPointX']"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-numeric"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">X</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>

                                        <v-col cols="5">
                                            <v-text-field
                                                    density="compact"
                                                    variant="solo"
                                                    required
                                                    :rules="floatRule"
                                                    type="number"
                                                    v-model="mapConfig['centerPointY']"
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-numeric"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">Y</p>
                                                </template>
                                            </v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="mb-2" inset/>

                                    <v-row class="ma-0 pa-0">
                                        <v-col cols="2" class="mysub">
                                            <p
                                                    style="
                        font-size: 10px;
                        white-space: nowrap;
                        margin-top: 8px;
                      "
                                            >
                                                محدوه نمایش نقشه :
                                            </p>
                                        </v-col>
                                        <v-col cols="10" class="ma-0 pa-0">
                                            <v-row class="pa-0 ma-0">
                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            type="number"
                                                            :rules="floatRule"
                                                            v-model="mapConfig.extendTopX"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>

                                                            <p class="">X</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            :rules="floatRule"
                                                            type="number"
                                                            v-model="mapConfig.extendTopY"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>
                                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                                            <p class="">Y</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="pa-0 ma-0">
                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            type="number"
                                                            :rules="floatRule"
                                                            v-model="mapConfig.extendBottomX"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>

                                                            <p class="">X</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            type="number"
                                                            :rules="floatRule"
                                                            v-model="mapConfig.extendBottomY"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>

                                                            <p class="">Y</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                        </v-col>
                                    </v-row>

                                    <v-divider class="mb-2" inset/>

                                    <v-row class="ma-0 pa-0" justify="end">
                                        <v-col cols="12" md="5">
                                            <v-autocomplete
                                                    :items="baseMaps"
                                                    item-title="name"
                                                    item-value="id"
                                                    density="compact"
                                                    v-model="mapConfig.baseMap"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="">نقشه زمینه </p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                        <v-col cols="12" md="5">
                                            <v-autocomplete
                                                    :items="ShowLayersTypeItems"
                                                    density="compact"
                                                    variant="solo"
                                                    :rules="nameRule"
                                                    v-model="mapConfig.showLayersType"
                                                    required
                                            >
                                                <template v-slot:prepend-inner>
                                                    <v-icon color="primary" icon="mdi-sitemap"/>
                                                </template>

                                                <template v-slot:label>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class=""> نوع نمایش لایه</p>
                                                </template>
                                            </v-autocomplete>
                                        </v-col>
                                    </v-row>

                                    <v-divider class="mb-2" inset/>

                                    <v-row class="ma-0 pa-0">
                                        <v-col cols="2" class="mysub">
                                            <p
                                                    style="
                        font-size: 10px;
                        white-space: nowrap;
                        margin-top: 8px;
                      "
                                            >
                                                تنظیمات زوم :
                                            </p>
                                        </v-col>
                                        <v-col cols="10" class="ma-0 pa-0">
                                            <v-row class="pa-0 ma-0">
                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            type="number"
                                                            :rules="floatRule"
                                                            v-model="mapConfig.max_zoom"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>

                                                            <p class="">زوم بالا</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            :rules="floatRule"
                                                            type="number"
                                                            v-model="mapConfig.min_zoom"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>
                                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                                            <p class="">زوم پایین</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>
                                            </v-row>
                                            <v-row class="pa-0 ma-0">
                                                <v-col cols="6">
                                                    <v-text-field
                                                            density="compact"
                                                            variant="solo"
                                                            required
                                                            type="number"
                                                            :rules="floatRule"
                                                            v-model="mapConfig.current_zoom"
                                                    >
                                                        <template v-slot:prepend-inner>
                                                            <v-icon color="primary" icon="mdi-numeric"/>
                                                        </template>

                                                        <template v-slot:label>

                                                            <p class="">زوم اولیه</p>
                                                        </template>
                                                    </v-text-field>
                                                </v-col>

                                            </v-row>
                                        </v-col>
                                    </v-row>



                                </v-form>
                                <v-row :disabled="!mapConfig['role']" class="ma-0 pa-0 mt-2 ml-1 mb-2" justify="end">
                                    <v-btn
                                            class="elevation-1"
                                            variant="tonal"
                                            append-icon="mdi-content-save"
                                            style="font-weight: bold !important; font-size: 10px"
                                            rounded="lg"
                                            size="small"
                                            @click="addMapConfigAction"
                                            color="primary"
                                    >ذخیره
                                    </v-btn
                                    >
                                </v-row>


                            </div>
                            <v-spacer></v-spacer>
                        </v-row>


                    </v-fade-transition>

                </SplitterPanel>

                <SplitterPanel
                        dir="rtl"
                        class=""
                        style="overflow-y: auto !important; min-width: 55px !important"
                        :size="20"
                >

                    <MyListForSpliter
                            v-if="mapConfigsList"
                            :data="mapConfigsList"
                            @itemClick="listItemClick"
                    ></MyListForSpliter>
                </SplitterPanel>
            </Splitter>
        </div>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import Splitter from "primevue/splitter";
    import SplitterPanel from "primevue/splitterpanel";
    import MyListForSpliter, {Item} from "@/components/common/myListForSpliter.vue";
    import role from "@/componentFunctions/roles_functions";
    import VForm from "@/models/VForm.interface";
    import {default as mapConfigFunctions} from '@/componentFunctions/mapConfig_functions'
    import rules from "@/componentFunctions/rules_functions";
    import {GetMapConfigInterface, MapConfigInterface, ShowLayersType} from "@/models/MapConfig.interface";
    import baseMap from "@/componentFunctions/baseMap_functions";



    export default defineComponent({
        name: "mapConfigComponent",
        components: {Splitter, SplitterPanel, MyListForSpliter},

        setup() {
            const {rolesWithParentName, getRolesWithParentName} = role()
            const {getBaseMaps, baseMaps} = baseMap()
            const {addMapConfig, getMapConfigById, getMapConfigs} = mapConfigFunctions()

            const initData = ref(false)
            const myAddMapConfig = ref<VForm>()
            const {nameRule, floatRule} = rules()
            const ShowLayersTypeItems = ref(Object.values(ShowLayersType))
            const mapConfig = ref<MapConfigInterface>()
            const mapConfigsList = ref<Item[] | null>()
            const MapConfigs = ref<GetMapConfigInterface[]>()

            onMounted(async () => {
                await getRolesWithParentName()
                await getBaseMaps()
                MapConfigs.value = await getMapConfigs()
                if (MapConfigs.value) {
                    mapConfigsList.value = MapConfigs.value.map((item) => {
                        return {name: item.role.name, ...item,legend:'/icons/setting.png'}
                    })
                    console.log(mapConfigsList.value)
                }

                mapConfig.value = {
                    centerPointY: 0,
                    centerPointX: 0,
                    extendBottomX: 0,
                    extendBottomY: 0,
                    extendTopX: 0,
                    extendTopY: 0,
                    showLayersType: ShowLayersType.TILE,
                    role: null,
                    baseMap: null,
                    max_zoom: 0,
                    min_zoom: 0,
                    current_zoom: 0,
                }
                initData.value = true
            })

            return {
                rolesWithParentName,
                initData,
                myAddMapConfig,
                nameRule,
                floatRule,
                mapConfig,
                ShowLayersTypeItems,
                baseMaps,
                addMapConfig,
                getMapConfigById,
                mapConfigsList,
                MapConfigs
            }


        },
        data() {
            return {
                initShow: false,


            };
        },
        watch: {
            initData() {
                if (this.initData) {
                    setTimeout(() => {
                        this.initShow = true
                    }, 300)
                }
            },

        },
        props: {},
        methods: {
            listItemClick(data: Item) {
                if (this.mapConfig && this.MapConfigs){
                    const role = this.mapConfig.role
                    const select = this.MapConfigs.filter((item)=>{
                        return item.id === data.id
                    })
                    if (select[0]){
                        this.mapConfig = {...select[0], baseMap: select[0].baseMap.id, role: role}
                    }

                }


            },

            async addMapConfigAction() {
                if (this.myAddMapConfig) {
                    const res = await this.myAddMapConfig.validate()

                    if (res.valid && this.mapConfig) {
                        await this.addMapConfig(this.mapConfig)
                    }
                }
            },

            async selectRole() {
                if (this.mapConfig && this.mapConfig.role) {
                    const response = await this.getMapConfigById({id: this.mapConfig.role})
                    if (response) {
                        this.mapConfig = {...response, baseMap: response.baseMap.id, role: response.role.id}
                    }
                }

            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
