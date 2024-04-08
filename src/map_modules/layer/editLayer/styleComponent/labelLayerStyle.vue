<template>
    <DialogWithSpliter
            :width="'70vw'"
            :height="'85vh'"
            :topic="'تنظیمات مشخصات لیبل لایه'"
            :show="showDialog"
            @closeDialog="$emit('hide', false)"
    >
        <template v-slot:main>
            <v-form ref="addTextStyleForm" class="myForm">
                <v-row class="ma-0 pa-0" justify="center">
                    <v-col class="" cols="12" sm="11">
                        <v-row
                                class="pa-0 ma-0 pt-4 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col cols="12" md="4" style="align-self: center">
                                <v-text-field :rules="nameRule" density="compact" variant="solo" required
                                              v-model="style.name">
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نام برچسب</p>
                                    </template>
                                </v-text-field>
                            </v-col>

                            <v-col cols="12" md="4" style="align-self: center">
                                <v-autocomplete
                                        :rules="nameRule"
                                        v-model="style.font_family"
                                        :items="listFonts"
                                        density="compact"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نوع فونت</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" md="4" style="align-self: center">
                                <v-autocomplete
                                        v-model="style.font_style"
                                        :items="fontStyles"
                                        :rules="nameRule"
                                        density="compact"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نوع قالب</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>

                            <v-col cols="12" md="4" style="align-self: center">

                                <v-autocomplete
                                        v-model="style.font_weight"
                                        :items="fontWights"
                                        :rules="nameRule"
                                        density="compact"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">ضخامت برچسب</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>
                        </v-row>

                        <v-row
                                class="pa-0 ma-0 mt-4 rounded-lg elevation-2"
                                style="background-color: white"
                                justify="space-around"
                        >


                            <v-col cols="12" md="5">
                                <div class="flex-column">
                                    <p class="text-caption">رنگ برچسب :</p>
                                    <v-color-picker v-model="style.fill_color" canvas-height="40"
                                                    hide-inputs></v-color-picker>
                                </div>
                            </v-col>


                            <v-col cols="12" md="5">
                                <v-range-slider
                                        lable="مقیاس زوم"
                                        :max="25"
                                        :min="9"
                                        :step="1"
                                        v-model="zoom"
                                        strict
                                        thumb-label="always"
                                        class="mb-n6 mt-5"
                                        rounded="true"
                                        thumb-size="12"
                                >
                                    <template v-slot:prepend>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="text-caption">مقیاس زوم برچسب:</p>
                                    </template>
                                </v-range-slider>
                                <v-slider
                                        :max="25"
                                        :min="9"
                                        :step="1"
                                        v-model="style.font_size"
                                        strict
                                        thumb-label="always"
                                        class="mb-n6 mt-6"
                                        rounded="true"
                                        thumb-size="12"
                                >
                                    <template v-slot:prepend>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="text-caption">اندازه فونت برچسب :</p>
                                    </template>
                                </v-slider>
                            </v-col>


                        </v-row>

                        <v-row
                                class="ma-0 pa-a mt-4 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col cols="12" class="mb-n8">
                                <v-switch v-model="haleConfig" color="primary">
                                    <template v-slot:prepend>
                                        <p class="text-caption"> داشتن هاله</p>
                                    </template>
                                </v-switch>
                            </v-col>

                            <v-slide-y-transition>
                                <v-col v-if="haleConfig" cols="12" class="ma-0 pa-0 pb-2">
                                    <v-row class="ma-0 pa-0" justify="space-around">


                                        <v-col cols="12" md="5" class="">
                                            <div class=" flex-column">
                                                <p class="text-caption">رنگ هاله :</p>
                                                <v-color-picker v-model="style.halo_fill" canvas-height="40"
                                                                hide-inputs></v-color-picker>
                                            </div>
                                        </v-col>

                                        <v-col class="ma-0 pa-0 justify-center" cols="12" md="5">
                                            <v-slider
                                                    :max="25"
                                                    :min="9"
                                                    :step="1"
                                                    v-model="style.halo_radius"
                                                    strict
                                                    thumb-label="always"
                                                    class="mb-n6 mt-3"
                                                    rounded="true"
                                                    thumb-size="12"
                                            >
                                                <template v-slot:prepend>
                                                    <!-- <p  class="text-primary">نام لایه</p> -->
                                                    <p class="text-caption"> ضخامت هاله :</p>
                                                </template>
                                            </v-slider>
                                        </v-col>
                                    </v-row>


                                </v-col>

                            </v-slide-y-transition>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="ma-0 pa-0  pb-4 pt-2" justify="center">
                    <v-col cols="12" sm="11">
                        <v-row class="ma-0 pa-0">
                            <v-btn
                                    @click="saveStyle"
                                    variant="tonal"
                                    prepend-icon="mdi-content-save"
                                    style="font-weight: bold !important"
                                    class="mt-1"
                                    rounded="lg"
                                    size="small"
                                    color="primary"
                            >ذخیره به عنوان الگو جدید
                            </v-btn
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                    variant="tonal"
                                    @click="saveStyleToLayer"
                                    prepend-icon="mdi-content-save"
                                    style="font-weight: bold !important"
                                    rounded="lg"
                                    size="small"
                                    class="mt-1"
                                    color="primary"
                            >ذخیره
                            </v-btn>
                        </v-row>

                    </v-col>
                </v-row>
            </v-form>
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
    import {defineComponent, onMounted, ref} from "vue";
    import DialogWithSpliter from "@/components/common/dialogWithSpliter.vue";
    import MyListForSpliter from "@/components/common/myListForSpliter.vue";
    import labelStyle from "@/componentFunctions/labelStyle_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {LabelStyleInterface, ListStyles} from "@/models/Style.interface";


    export default defineComponent({
        name: "LabelLayerStyle",
        components: {DialogWithSpliter, MyListForSpliter},

        setup() {
            const {labelStyleItem, getItemLabelStyle, listStyles, getListTextStyles, addTextStyle, getListFonts, listFonts, fontStyles, getFontStyles, getFontWights, fontWights} = labelStyle()


            const addTextStyleForm = ref<VForm>()
            const {nameRule} = rules()


            onMounted(async () => {
                await getListTextStyles()
                await getListFonts()
                await getFontStyles()
                await getFontWights()
            })
            return {
                listStyles,
                listFonts,
                fontStyles,
                fontWights,
                addTextStyleForm,
                addTextStyle,
                nameRule,
                getItemLabelStyle,
                labelStyleItem
            }
        },

        data() {
            return {
                showDialog: false,

                haleConfig: true,


                style: {} as LabelStyleInterface,


                halo_radius: 3,
                font_size: 22,
                zoom: [17, 23],
                color: "#131213",
                font_family: 'Arial',
                font_weight: 'normal',
                font_style: 'normal'
            };
        },
        props: {
            show: Boolean,
        },
        methods: {
            async listItemClick(data: ListStyles) {
                console.log(data);
                await this.getItemLabelStyle(data.id)
                if (this.labelStyleItem && this.labelStyleItem.min_zoom && this.labelStyleItem.max_zoom){
                    this.zoom = [this.labelStyleItem.min_zoom,this.labelStyleItem.max_zoom]
                    this.style = this.labelStyleItem
                }
            },

            async saveStyle() {
                if (this.addTextStyleForm) {
                    const res = await this.addTextStyleForm.validate()

                    if (res.valid) {
                        console.log(this.style, this.zoom)
                        const data: LabelStyleInterface = {
                            ...this.style,
                            max_zoom: this.zoom[1],
                            min_zoom: this.zoom[0],
                        }
                        const response = await this.addTextStyle(data)
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
                if (this.addTextStyleForm) {
                    const res = await this.addTextStyleForm.validate()

                    if (res.valid) {
                        console.log(this.style, this.zoom)
                        const data: LabelStyleInterface = {
                            ...this.style,
                            max_zoom: this.zoom[1],
                            min_zoom: this.zoom[0],
                            for_layer:true
                        }
                        const response = await this.addTextStyle(data)
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
        },

        updated(): void {
            this.style.fill_color = this.color
            this.style.halo_fill = this.color
            this.style.halo_radius = this.halo_radius
            this.style.font_size = this.font_size
            this.style.font_family = this.font_family
            this.style.font_weight = this.font_weight
            this.style.font_style = this.font_style
        },
        watch: {
            show() {
                this.showDialog = this.show;
            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
