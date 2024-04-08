<template>
    <DialogWithSpliter
            :width="'70vw'"
            :height="'85vh'"
            :topic="'تنظیمات مشخصات ظاهر لایه'"
            :show="showDialog"
            @closeDialog="$emit('hide', false)"
    >

        <template v-slot:main>
            <v-form ref="addBaseStyleForm" class="myForm">
                <v-row class="ma-0 pa-0" justify="center">
                    <v-col cols="12" sm="11">
                        <v-row class="pa-0 ma-0 rounded-lg elevation-2 pt-4 pb-2 mt-4" style="background-color: white"
                               justify="space-around">
                            <v-col cols="12" md="4" style="align-self: center">
                                <v-text-field :rules="nameRule" v-model="style.name" density="compact" variant="solo"
                                              required>
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نام الگو</p>
                                    </template>


                                </v-text-field>
                            </v-col>


                            <v-col cols="12" md="4">
                                <v-range-slider
                                        lable="مقیاس زوم"
                                        :max="25"
                                        :min="4"
                                        :step="1"
                                        v-model="style.zoom"
                                        strict
                                        thumb-label="always"
                                        class="mb-n6 mt-4"
                                        rounded="true"
                                        thumb-size="12"
                                        :rules="nameRule"
                                >
                                    <template v-slot:prepend>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="text-caption">مقیاس زوم :</p>
                                    </template>
                                </v-range-slider>
                            </v-col>


                        </v-row>

                        <v-row v-if="layerType === 'Polygon'" class="ma-0 pa-0 mt-2 pb-2 rounded-lg elevation-2"
                               style="background-color: white"
                               justify="space-around">

                            <v-col
                                    cols="12"
                                    md="4"
                                    class=" mt-2"
                                    style=""
                            >
                                <v-autocomplete
                                        :items="polygonPatterns"
                                        item-value="name"
                                        item-title="name"
                                        v-model="style.polygon.pattern"
                                        density="compact"
                                        variant="solo"
                                        :rules="nameRule"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>
                                    <template v-slot:item="{ props, item }">
                                        <v-row class="ma-0 pa-0 pa-1 pr-2 rounded-lg " v-bind="props"
                                               style="cursor: pointer"
                                               :class="props.title===style.polygon.pattern?'bg-blue-lighten-5':''">
                                            <v-avatar size="small">
                                                <v-img
                                                        :src="$store.state.geoUrl+item.raw.legend"
                                                        alt="John"
                                                ></v-img>
                                            </v-avatar>
                                            <p class="text-subtitle-2 mt-1 mr-2">{{item.title}}</p>

                                        </v-row>

                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">انتخاب نوع هاشور</p>
                                    </template>
                                </v-autocomplete>


                                <p class="text-caption">رنگ هاشور :</p>
                                <v-color-picker :rules="nameRule" v-model="style.polygon.pattern_color"
                                                canvas-height="40"
                                                hide-inputs></v-color-picker>

                            </v-col>


                            <v-col
                                    cols="12"
                                    md="4"
                                    class=" mt-4"
                                    style=""
                            >


                                <p class="text-caption">رنگ داخلی :</p>
                                <v-color-picker :rules="nameRule" v-model="style.polygon.color" canvas-height="40"
                                                hide-inputs></v-color-picker>

                            </v-col>


                        </v-row>

                        <v-row v-if="layerType === 'Polygon' || layerType === 'Line'"
                               class="ma-0 pa-0 mt-2 rounded-lg elevation-2 py-2" style="background-color: white"
                               justify="space-around">


                            <v-col
                                    cols="12"
                                    md="4"
                                    class=""

                            >
                                <v-autocomplete
                                        :items="linePatterns"
                                        item-value="name"
                                        item-title="name"
                                        density="compact"
                                        variant="solo"
                                        v-model="style.edge.pattern"
                                        :rules="nameRule"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">انتخاب نوع لبه</p>
                                    </template>
                                    <template v-slot:item="{ props, item }">
                                        <v-row class="ma-0 pa-0 pa-1 pr-2 rounded-lg " v-bind="props"
                                               style="cursor: pointer"
                                               :class="props.title===style.edge.pattern?'bg-blue-lighten-5':''">
                                            <v-avatar size="small">
                                                <v-img
                                                        :src="$store.state.geoUrl+item.raw.legend"
                                                        alt="John"
                                                ></v-img>
                                            </v-avatar>
                                            <p class="text-subtitle-2 mt-1 mr-2">{{item.title}}</p>

                                        </v-row>

                                    </template>

                                </v-autocomplete>

                                <div class="d-flex flex-column">


                                    <v-slider
                                            :max="25"
                                            :min="1"
                                            :step="1"
                                            v-model="style.edge.width"
                                            strict
                                            thumb-label="always"
                                            class="mb-n6 mt-7"
                                            rounded="true"
                                            thumb-size="12"
                                            :rules="nameRule"
                                    >
                                        <template v-slot:prepend>
                                            <!-- <p  class="text-primary">نام لایه</p> -->
                                            <p class="text-caption">ضخامت لبه :</p>
                                        </template>
                                    </v-slider>
                                </div>
                            </v-col>

                            <v-col
                                    cols="12"
                                    md="4"

                            >
                                <p class="text-caption">رنگ لبه :</p>
                                <v-color-picker :rules="nameRule" v-model="style.edge.color" canvas-height="40"
                                                hide-inputs></v-color-picker>
                            </v-col>

                        </v-row>

                        <v-row v-if="layerType === 'Point'" class="ma-0 pa-0 rounded-lg">
                            <v-col
                                    cols="12"
                                    md="6"
                                    class="rounded-lg mt-2 elevation-2"
                                    style="background-color: white"
                            >
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12">
                                        <v-btn
                                                variant="tonal"
                                                prepend-icon="mdi-map-marker"
                                                style="font-weight: bold !important"
                                                rounded="lg"
                                                size="small"
                                                color="primary"
                                                @click="iconDialog = true"
                                        >آیکن
                                        </v-btn
                                        >
                                    </v-col>
                                </v-row>
                                <v-row class="ma-0 pa-0">
                                    <v-col cols="12" md="10">
                                        <v-slider
                                                :max="50"
                                                :min="9"
                                                :step="1"
                                                v-model="style.point.size"
                                                strict
                                                thumb-label="always"
                                                class="mb-n6 mt-7"
                                                rounded="true"
                                                thumb-size="12"
                                        >
                                            <template v-slot:prepend>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="text-caption">اندازه آیکن :</p>
                                            </template>
                                        </v-slider>
                                    </v-col>
                                </v-row>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0  pb-4 pt-2" justify="center">
                    <v-col cols="12" sm="11">
                        <v-row class="ma-0 pa-0 ">
                            <v-btn
                                    variant="tonal"
                                    prepend-icon="mdi-content-save"
                                    style="font-weight: bold !important"
                                    rounded="lg"
                                    size="small"
                                    class="mt-1"
                                    color="primary"
                                    @click="saveStyle"


                            >ذخیره به عنوان الگو جدید
                            </v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                    @click="saveStyleToLayer"
                                    class="mt-1"
                                    variant="tonal"
                                    prepend-icon="mdi-content-save"
                                    style="font-weight: bold !important"
                                    rounded="lg"
                                    size="small"
                                    color="primary"
                            >ذخیره
                            </v-btn
                            >
                        </v-row>

                    </v-col>

                </v-row>

            </v-form>
            <simple-dialog
                    :show="iconDialog"
                    topic="آیکن ها"
                    width="50vw"
                    height="50vh"
                    @closeDialog="iconDialog=false"
            >
                <div
                        style="height: 100%;width: 100%;background-color: #f3f3f3;overflow: auto;" class="pa-2">
                    <v-item-group
                            v-model="iconSelect"

                    >
                        <v-row class="ma-0 pa-0">
                            <v-col
                                    v-for="(item, i) in items"
                                    :key="i"
                                    cols="3"
                                    md="1"
                            >
                                <v-item v-slot="{ isSelected, toggle }">
                                    <v-img
                                            :src="item"
                                            cover

                                            class="text-right pa-2 rounded-lg "
                                            @click="toggle"
                                            style="cursor: pointer"
                                    >
                                        <v-btn color="primary" variant="text" size="compact">
                                            <v-icon v-if="isSelected" size="compact">mdi-checkbox-marked-circle</v-icon>
                                        </v-btn>
                                    </v-img>
                                </v-item>
                            </v-col>
                        </v-row>
                    </v-item-group>
                    <v-row class="pa-0 ma-0 " align="end" justify="end">
                        <v-btn @click="savePointIcon" size="small" variant="tonal" color="primary"
                               style="font-weight: bold">
                            ذخیره
                        </v-btn>
                    </v-row>


                </div>
            </simple-dialog>

        </template>

        <template v-slot:side>
            <MyListForSpliter
                    :data="listStyles"
                    @itemClick="listItemClick"
            ></MyListForSpliter>
        </template>
    </DialogWithSpliter>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref, watch} from "vue";
    import DialogWithSpliter from "@/components/common/dialogWithSpliter.vue";
    import MyListForSpliter from "@/components/common/myListForSpliter.vue";
    import baseStyle from "@/componentFunctions/baseStyle_functions";
    import {BaseStyleInterface, ListStyles} from "@/models/Style.interface";
    import SimpleDialog from "@/components/common/simpleDialog.vue";
    import {useStore} from "vuex";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {LayerItem} from "@/store/openLayer/types";

    export default defineComponent({
        name: "BaseLayerStyle",
        components: {DialogWithSpliter, MyListForSpliter, SimpleDialog},

        setup() {
            const {
                baseStyleItem, getItemBaseStyle, getListBaseStyles, listStyles, getLinePattern,
                getPolygonPattern,
                addBaseModelStyle,
                linePatterns,
                polygonPatterns
            } = baseStyle()

            const store = useStore()
            const addBaseStyleForm = ref<VForm>()
            const {nameRule} = rules()

            const layerType = ref('Polygon')
            const items = ref([

                store.state.frontUrl + '/pointIcons/1.gif',

                store.state.frontUrl + '/pointIcons/2.gif',

                store.state.frontUrl + '/pointIcons/3.png',

                store.state.frontUrl + '/pointIcons/4.gif',

                store.state.frontUrl + '/pointIcons/5.gif',

                store.state.frontUrl + '/pointIcons/6.png',

                store.state.frontUrl + '/pointIcons/7.png',


            ])

            watch(() => store.state.frontUrl, (value: string) => {
                items.value = [

                    store.state.frontUrl + '/pointIcons/1.gif',

                    store.state.frontUrl + '/pointIcons/2.gif',

                    store.state.frontUrl + '/pointIcons/3.png',

                    store.state.frontUrl + '/pointIcons/4.gif',

                    store.state.frontUrl + '/pointIcons/5.gif',

                    store.state.frontUrl + '/pointIcons/6.png',

                    store.state.frontUrl + '/pointIcons/7.png',
                ]
            });

            onMounted(async () => {
                await getListBaseStyles(layerType.value)
                await getPolygonPattern()
                await getLinePattern()
            })

            return {
                listStyles, getItemBaseStyle, baseStyleItem, linePatterns,
                polygonPatterns, layerType, store, items, addBaseModelStyle, addBaseStyleForm, nameRule
            }
        },


        data() {
            return {
                showDialog: false,

                style: {
                    name: '',
                    zoom: [13, 22],
                    polygon: {
                        color: "#ff00ff" as string | null,
                        pattern: null as string | null,
                        pattern_color: "#ff00ff" as string | null
                    } as {
                        color: string | null,
                        pattern: string | null,
                        pattern_color: string | null
                    } | null,
                    edge: {
                        color: null,
                        pattern: null as string | null,
                        width: 1 as number | null
                    } as {
                        color: string | null,
                        pattern: string | null,
                        width: number | null
                    } | null,
                    point: {} as {
                        icon: string | null,
                        size: number | null
                    } | null
                },
                styleInit: {
                    name: '',
                    zoom: [13, 22],
                    polygon: {} as {
                        color: string | null,
                        pattern: string | null,
                        pattern_color: string | null
                    } | null,
                    edge: {} as {
                        color: string | null,
                        pattern: string | null,
                        width: number | null
                    } | null,
                    point: {} as {
                        icon: string | null,
                        size: number | null
                    } | null
                },

                iconDialog: false,

                iconSelect: 0,

            };
        },
        props: {
            show: Boolean,
        },
        methods: {
            async listItemClick(data: ListStyles) {
                await this.getItemBaseStyle(data.id)
                if (this.baseStyleItem && this.baseStyleItem.max_zoom && this.baseStyleItem.min_zoom) {
                    this.style = {
                        ...this.baseStyleItem,
                        zoom: [this.baseStyleItem.min_zoom, this.baseStyleItem.max_zoom]
                    }
                }

            },

            async saveStyle() {
                if (this.addBaseStyleForm) {
                    const res = await this.addBaseStyleForm.validate()

                    if (res.valid) {
                        const data: BaseStyleInterface = {
                            ...this.style,
                            max_zoom: this.style.zoom[1],
                            min_zoom: this.style.zoom[0],
                            geo_type: this.layerType
                        }
                        const response = await this.addBaseModelStyle(data)
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'مدل اضافه شد '
                            });

                        }
                    }
                }
            },


            async saveStyleToLayer() {
                if (this.addBaseStyleForm) {
                    const res = await this.addBaseStyleForm.validate()

                    if (res.valid) {
                        const data: BaseStyleInterface = {
                            ...this.style,
                            max_zoom: this.style.zoom[1],
                            min_zoom: this.style.zoom[0],
                            geo_type: this.layerType,
                            for_layer:true
                        }
                        const response = await this.addBaseModelStyle(data)
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'مدل اضافه شد '
                            });

                        }
                    }
                }
            }
            ,

            savePointIcon() {
                if (this.style.point && this.style.point.icon) {
                    this.style.point.icon = this.items[this.iconSelect]

                }
            }
        }
        ,
        watch: {
            show() {
                this.showDialog = this.show;
            }
            ,
            style() {
                if (this.style.point && this.style.point.icon) {
                    this.items.map((item, index) => {
                        if (this.style.point && this.style.point.icon === item) {
                            this.iconSelect = index
                        }
                    })

                }
            },

        }
        ,
        updated() {
            this.style = this.styleInit
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
