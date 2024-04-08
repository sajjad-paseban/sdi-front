<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p v-if="topicShow" class="font-weight-bold pr-4 header_font">انتخاب عملیات پردازشی</p>
                <v-spacer></v-spacer>
                <v-col :cols="searchCol" sm="4" style="height: 80%;transition: 500ms">

                    <v-text-field
                            density="compact"
                            variant="solo"
                            v-model="searchProcessText"
                            @focus="searchFocus"
                            @blur="searchFocusOut"
                            required
                    >
                        <template v-slot:prepend-inner>
                            <v-icon color="primary" icon="mdi-magnify"/>
                        </template>

                        <template v-slot:label>
                            <!-- <p  class="text-primary">نام لایه</p> -->
                            <p class="">جستجو عملیات پردازشی</p>
                        </template>
                    </v-text-field>

                </v-col>
                <v-btn
                        variant="flat"
                        size="x-small"
                        color="white"
                        class="ml-2"
                        style="font-weight: bold !important;width: 40px;height: 30px"
                        v-tooltip.bottom="'دسته بندی بر اساس ورودی'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/input.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                    <v-menu activator="parent" location="bottom" offset="10px">
                        <v-list class="">
                            <v-list-item style="cursor: pointer">

                                <v-list-item-title @click="filterProcessInput('همه')" class=" font-weight-bold">{{ 'همه'
                                    }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                    v-for="(item, index) in processInputTypesValue"
                                    :key="index"
                                    style="cursor: pointer"
                                    @click="filterProcessInput(item)"
                            >

                                <v-list-item-title class=" font-weight-bold">{{ convertProcessInputToFarsi(item) }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
                <v-btn
                        variant="flat"
                        size="x-small"
                        color="white"
                        class="ml-2"
                        style="font-weight: bold !important;width: 40px;height: 30px"
                        v-tooltip.bottom="'دسته بندی بر اساس خروجی'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/export.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                    <v-menu activator="parent" location="bottom" offset="10px">
                        <v-list class="">
                            <v-list-item style="cursor: pointer">

                                <v-list-item-title @click="filterProcessOutput('همه')" class=" font-weight-bold">{{
                                    'همه'
                                    }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item
                                    v-for="(item, index) in processOutputTypesValue"
                                    :key="index"
                                    style="cursor: pointer"
                                    @click="filterProcessOutput(item)"
                            >

                                <v-list-item-title class=" font-weight-bold">{{ item }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>
            </v-row>
        </v-toolbar>
        <div style="height: calc(100% - 49px) ;overflow-y: hidden" class="bg-grey-lighten-2">
            <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                <v-fade-transition>
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-fade-transition>
            </v-row>
            <v-fade-transition>
                <v-row class="pa-0 ma-0 "
                       style="overflow-y: auto;height: calc(100% - 10px);margin-top: 10px!important;align-content: flex-start"
                       justify="start">
                    <v-col :key="index" v-for="(item,index) in searchProcessListValue" cols="12" style="height: 140px"
                           sm="4" md="2" class="my-2">
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-card @click="setActiveItem(item.name)" :elevation="isHovering ? 10 : 2" height="140"
                                        class="border rounded-lg"
                                        v-bind="props"
                                        :color="isHovering ? (activeItem === item.name?'info':'card_active') : (activeItem === item.name?'info':undefined)">
                                    <div style="height: 100%;width: 100%">
                                        <v-row class="ma-0 pa-0 bg-blue-grey-lighten-5" style="height:30%;width: 100%"
                                               justify="center" align="center">
                                            <p style="font-size: 13px;color: blue" class="font-weight-bold mt-2">
                                                {{item.p_name}}</p>
                                        </v-row>
                                        <v-divider></v-divider>
                                        <v-row class="ma-0 pa-0 pr-3 mt-1" style="height:30%;width: 100%"
                                               justify="center" align="center">
                                            <v-col cols="12" class="font-weight-bold ma-0 pa-0"
                                                   style="font-size:11px;overflow: hidden;white-space: nowrap;text-overflow: ellipsis">

                                                ورودی : {{convertProcessInputToFarsi(item.input_type)}}
                                            </v-col>
                                            <v-col cols="12" class="font-weight-bold ma-0 pa-0" style="font-size:11px">
                                                خروجی : {{item.output_type}}
                                            </v-col>
                                        </v-row>
                                        <v-row class="ma-0 pa-0" style="height:40%;width: 100%" justify="start"
                                               align="center">
                                            <v-col cols="12"
                                                   style="height: 100%;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;font-size:10px"
                                                   class="">
                                                توضیحات : {{item.des}}
                                            </v-col>
                                        </v-row>


                                    </div>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-fade-transition>

        </div>
        <v-divider></v-divider>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {AddAnalyze, ProcessInput, ProcessItem} from "@/models/Analyze.interface";
    import {useToast} from "primevue/usetoast";


    export default defineComponent({
        name: "SetModelProcessComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()
            const toast = useToast()

            const initData = ref(false)
            const searchProcessListValue = ref<ProcessItem[]>([])

            const {
                getProcessList, processListValue, processInputTypesValue, getProcessInputTypes,
                getProcessOutputTypes, processOutputTypesValue
            } = analyze_functions()


            onMounted(async () => {
                await getProcessList()
                await getProcessInputTypes()
                await getProcessOutputTypes()

                searchProcessListValue.value = processListValue.value

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                store, router, processListValue, initData, processInputTypesValue, processOutputTypesValue,
                searchProcessListValue, toast

            }
        },
        data() {
            return {
                searchCol: 2,
                topicShow: true,


                activeItem: '',

                searchProcessText: ''
            };
        },
        watch: {
            searchProcessText(newValue, oldValue) {
                this.searchProcessListValue = this.processListValue.filter((i) => {
                    return i.p_name.includes(newValue)
                })
            }
        },
        props: {},
        methods: {
            setActiveItem(name: string) {
                this.activeItem = name
            },
            searchFocus() {
                this.searchCol = 6
                if (window.innerWidth <= 600)
                    this.topicShow = false
            },
            searchFocusOut() {
                this.searchCol = 2
                setTimeout(() => {
                    this.topicShow = true
                }, 600)
            },

            filterProcessInput(input: string) {
                if (input === 'همه') {
                    this.searchProcessListValue = this.processListValue
                } else {
                    this.searchProcessListValue = this.processListValue.filter((i) => {
                        return i.input_type === input
                    })
                }
            },

            filterProcessOutput(input: string) {
                if (input === 'همه') {
                    this.searchProcessListValue = this.processListValue
                } else {
                    this.searchProcessListValue = this.processListValue.filter((i) => {
                        return i.output_type === input
                    })
                }
            },

            convertProcessInputToFarsi(value: ProcessInput) {
                if (value === ProcessInput.Features) {
                    return 'چند عارضه'
                } else if (value === ProcessInput.FeaturesAndFeature) {
                    return 'عارضه و چند عارضه'
                } else {
                    return 'عدد و چند عارضه'
                }
            },

            nextPageFunc(analyze: AddAnalyze) {

                if (this.activeItem) {
                    this.searchProcessListValue.map((item) => {
                        if (item.name === this.activeItem) {
                            analyze.process = item
                        }
                    })
                    return {
                        result: true,
                        data: null
                    }
                } else {
                    this.toast.add({
                        group: 'br',
                        life: 2000,
                        severity: 'error',
                        summary: ' خطا در عملیات',
                        detail: 'مدل پردازشی انتخاب نشده است '
                    });

                    return {
                        result: false,
                        data: null
                    }
                }

            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (max-width: 600px) {
        .header_font {
            font-size: 10px;
        }
    }
</style>
