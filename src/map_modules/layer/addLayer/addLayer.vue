<template>

        <div  class="pa-2" style="width: 100%; height: 100%;">

            <Fieldset v-if="addLayerType=== null" legend="اضافه کردن لایه">
                <p class="pb-2">
                    در این فرم امکان افزودن لایه مد نظر از روش های مختلف به سامانه
                    مقدور میباشد.
                </p>
                <p>
                    با انتخاب روش مد نظر و انجام مراحل آن لایه مورد نظر را به سامانه
                    اضافه کنید
                </p>
            </Fieldset>

            <v-row v-if="addLayerType=== null" class="ma-0 pa-0 mt-2" style="height: 30dvh" align="center">
                <v-col cols="12" sm="6" class="ma-0 pa-0 ">
                    <v-row class="ma-0 pa-0">
                        <v-col cols="12" md="8">
                            <v-select
                                    v-model="addLayerType"
                                    chips
                                    clearable
                                    prepend-inner-icon="mdi-bookmark-plus-outline"
                                    variant="solo"
                                    :items="items"
                                    item-title="text"
                                    item-value="value"
                                    label="انتخاب روش افزودن لایه"
                                    @update:modelValue="selectTypeOfAddLayer"
                            ></v-select>
                        </v-col>
                    </v-row>
                </v-col>
                <v-col class="pa-0 ma-0" sm="6">
                    <v-row class="pa-0 ma-0 mt-4 " justify="center">
                        <v-card width="25vh" height="25dvh" class="rounded-lg elevation-3">
                            <v-img
                                    src="@/assets/gifs/addLayer.gif"
                                    height="100%"
                                    cover
                                    class="bg-grey-lighten-2"
                            ></v-img>
                        </v-card>
                    </v-row>


                </v-col>
            </v-row>

                <div v-if="addLayerType" style="height: 100%">
                    <v-row class="ma-0 pa-0">
                        <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-2">{{title}}</v-btn>
                    </v-row>
                    <div class="rounded-lg mt-n4 pt-4 elevation-2" style="width: 100%;height: calc(100% - 15px);overflow: auto">
                        <router-view></router-view>
                    </div>
                </div>




        </div>



</template>

<script lang="ts">
    import {defineComponent} from "vue"
    import Fieldset from "primevue/fieldset";


    export default defineComponent({
        name: "AddLayer",
        components: {Fieldset},
        data() {
            return {
                items: [
                    {
                        text: "افزودن لایه با فایل",
                        value: "upload",
                    },
                    {
                        text: "افزودن لایه خام",
                        value: "emptyLayerConfig",
                    },
                    {
                        text: "افزودن لایه با پرس جو از لایه",
                        value: "searchLayerConfig",
                    },
                    {
                        text: "ایجاد لایه از پرس جو در دیتابیس متصل و لایه مد نظر ",
                        value: "SDlayerConfig",
                    },
                    {
                        text: "افزودن لایه از طریق وب سرویس",
                        value: "service",
                    },
                ],

                show: false,
                title: '',
                addLayerType: null as string|null,
            };
        },
        directives: {},

        props: {},
        methods: {
            selectTypeOfAddLayer(data: null | string) {
                if (data) {
                    this.$router.push({name: data});

                    this.items.map((item: { text: string, value: string }) => {
                        if (item.value === data) {
                            setTimeout(() => {
                                this.title = item.text
                            }, 300)

                        }
                    })
                }
            },
        },

        beforeUpdate() {
            if (this.$route.name === 'addLayer'){
                this.addLayerType = null
                this.title = ''
            }else {
                if (this.$route.name){
                    this.addLayerType = String(this.$route.name)
                }

            }

        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
