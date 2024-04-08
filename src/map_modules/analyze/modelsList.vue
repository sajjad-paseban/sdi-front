<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <v-col cols="8" sm="4" style="height: 80%">

                    <v-text-field
                            density="compact"
                            variant="solo"
                            v-model="modelSearchText"
                            required
                    >
                        <template v-slot:prepend-inner>
                            <v-icon color="primary" icon="mdi-magnify"/>
                        </template>

                        <template v-slot:label>
                            <!-- <p  class="text-primary">نام لایه</p> -->
                            <p class="">جستجو مدل</p>
                        </template>
                    </v-text-field>

                </v-col>
                <v-spacer></v-spacer>

                <v-btn
                        variant="flat"
                        size="x-small"
                        color="white"
                        class="ml-2"
                        style="font-weight: bold !important;width: 40px;height: 30px"
                        v-tooltip.right="'انتخاب دسته'"
                >
                    <v-avatar size="25" class="">
                        <v-img
                                class=""
                                src="@/assets/icons/list.png"
                                alt="John"
                        ></v-img>
                    </v-avatar>
                    <v-menu activator="parent" location="bottom" offset="10px">
                        <v-list class="">
                            <v-list-item style="cursor: pointer">

                                <v-list-item-title @click="filterAnalyzeGroup('همه')" class=" font-weight-bold">{{ 'همه'
                                    }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item style="cursor: pointer"
                                         v-for="(item, index) in analyzeGroupListValue"
                                         :key="index"
                            >

                                <v-list-item-title @click="filterAnalyzeGroup(item.name)" class=" font-weight-bold">{{
                                    item.name }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>

            </v-row>


        </v-toolbar>
        <div style="height: calc(100% - 49px);overflow-y: hidden" class="bg-grey-lighten-2">
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
                <v-row v-if="initData" class="pa-0 ma-0"
                       style="overflow-y: auto;height: calc(100% - 10px);margin-top: 10px!important;align-content: flex-start">
                    <v-col :key="index" v-for="(i,index) in analyzeListValueSearch" cols="12"
                           sm="4" md="3">
                        <v-hover>
                            <template v-slot:default="{ isHovering, props }">
                                <v-card :elevation="isHovering ? 10 : 2" height="150" class="border rounded-lg"
                                        v-bind="props"
                                        :color="isHovering ? 'card_active' : undefined">
                                    <div style="height: 100%;width: 100%">
                                        <div style="height: 70%;width: 100%">
                                            <v-row class="pa-0 ma-0 pa-1 mr-n1" style="height:30%;font-size: 11px"
                                                   align="center">
                                                <v-col style="height:80%" cols="7" class="ma-0  font-weight-bold">
                                                    نام : {{i.name}}
                                                </v-col>
                                                <v-col style="height:80%" cols="5"
                                                       class="ma-0 pa-0 pa-1 font-weight-bold">
                                                    دسته : {{i.group.name}}
                                                </v-col>
                                            </v-row>
                                            <v-row class="pa-0 ma-0 pa-1" style="height:70%;font-size: 11px"
                                                   align="start">
                                                <v-col cols="12"
                                                       style="height: 80%;text-overflow: ellipsis;overflow: hidden;display: -webkit-box;-webkit-box-orient: vertical;-webkit-line-clamp: 3;"
                                                       class="ma-0 pa-1">
                                                    توضیحات : {{i.des}}
                                                </v-col>
                                            </v-row>
                                        </div>
                                        <v-divider class="font-weight-bold"/>

                                        <div style="height: calc(30% - 2px);width: 100%">
                                            <v-row class="ma-0 pa-0" style="height: 100%" align="center"
                                                   justify="start">
                                                <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'ویرایش'"
                                                >
                                                    <v-avatar size="25" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/edit.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                                <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        @click="deleteModel(i.id)"
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'حذف'"
                                                >
                                                    <v-avatar size="25" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/delete.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                                <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'اطلاعات api'"
                                                >
                                                    <v-avatar size="25" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/api.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                                <v-btn
                                                        variant="text"
                                                        size="x-small"
                                                        color="white"
                                                        class=""
                                                        @click="router.push({name: 'runAnalyze',
                                                        params: {id: i.id}})"
                                                        style="font-weight: bold !important;"
                                                        v-tooltip.bottom="'اجرای مدل'"
                                                >
                                                    <v-avatar size="25" class="">
                                                        <v-img
                                                                class=""
                                                                src="@/assets/icons/play.png"
                                                                alt="John"
                                                        ></v-img>
                                                    </v-avatar>
                                                </v-btn>
                                            </v-row>
                                        </div>
                                    </div>
                                </v-card>
                            </template>
                        </v-hover>
                    </v-col>
                </v-row>
            </v-fade-transition>

        </div>
        <v-scale-transition>
            <v-btn @click="router.push({name:'addModelConfig'})" v-tooltip.left="'اضافه کردن مدل'" class="elevation-3"
                   v-show="floatBtnShow" color="info"
                   style="position: absolute;bottom: 30px;right: 30px" size="small" icon>
                <v-icon>mdi-plus</v-icon>
            </v-btn>
        </v-scale-transition>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {AnalyzeListItem} from "@/models/Analyze.interface";


    export default defineComponent({
        name: "AnalyzeModelsListComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()

            const {getAnalyzeList, analyzeListValue, getAnalyzeGroupList, analyzeGroupListValue,deleteAnalyzeModel} = analyze_functions()

            const initData = ref(false)
            const analyzeListValueSearch = ref<AnalyzeListItem[]>([])

            onMounted(async () => {
                await getAnalyzeList()
                await getAnalyzeGroupList()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })

            return {
                store, router, analyzeListValue, initData, analyzeGroupListValue, analyzeListValueSearch,deleteAnalyzeModel,getAnalyzeList
            }
        },
        data() {
            return {
                floatBtnShow: false,
                modelSearchText: null
            };
        },
        props: {},
        methods: {
            filterAnalyzeGroup(groupName: string) {
                if (groupName === 'همه') {
                    this.analyzeListValueSearch = this.analyzeListValue
                } else {
                    this.analyzeListValueSearch = this.analyzeListValue.filter((i) => {
                        return i.group.name === groupName
                    })
                }

            },

            deleteModel(id:number){
                this.store.commit('setConfirmDialog', {
                    massage: 'آیا حذف مورد تایید است ؟',
                    topic: 'اخطار',
                    active:true,
                    accept: async () => {
                        await this.deleteAnalyzeModel(id)
                        await this.getAnalyzeList()

                    },
                    reject: () => {
                        console.log('reject')
                    },

                })
            }
        },
        watch: {
            modelSearchText(newValue, oldValue) {
                this.analyzeListValueSearch = this.analyzeListValue.filter((i) => {
                    return i.name.includes(newValue)
                })
            },
            analyzeListValue(){
                this.analyzeListValueSearch = this.analyzeListValue
            }
        },
        mounted(): void {
            setTimeout(() => {
                this.floatBtnShow = true
            }, 300)


        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
