<template>
    <div style="height:100%;width: 100%;position: relative">
        <v-toolbar color="info" density="compact" class="rounded-b-lg myForm elevation-3">
            <v-row class="pa-0 ma-0 " style="height: 100%" align="center">
                <p v-if="topicShow"  class="font-weight-bold pr-4 header_font" >انتخاب مدل</p>
                <v-spacer></v-spacer>
                <v-col  :cols="searchCol" sm="4" style="height: 80%;transition: 500ms">

                    <v-text-field
                            density="compact"
                            variant="solo"
                            @focus="searchFocus"
                            @blur="searchFocusOut"
                            v-model="modelSearchText"
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
                            <v-list-item
                                    v-for="(item, index) in analyzeGroupListValue"
                                    :key="index"
                                    style="cursor: pointer" @click="filterAnalyzeGroup(item.name)"
                            >

                                <v-list-item-title  class=" font-weight-bold">{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </v-btn>

            </v-row>
        </v-toolbar>
        <div  style="height: calc(100% - 49px) ;overflow-y: hidden" class="bg-grey-lighten-2">
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
                <v-row class="ma-0 pa-0 " style="height:100%;width: 100%">
                    <v-row class="pa-0 ma-0 "
                           style="overflow-y: auto;height: calc(100% - 50px);width: 100%;margin-top: 10px!important;align-content: flex-start"
                           justify="start">
                        <v-col :key="index" v-for="(item,index) in analyzeListValueSearch" cols="12" style="height: 140px"
                               sm="4" md="3" class="my-2">
                            <v-hover>
                                <template v-slot:default="{ isHovering, props }">
                                    <v-card @click="setActiveItem(item.id)" :elevation="isHovering ? 10 : 2" height="140"
                                            class="border rounded-lg"
                                            v-bind="props"
                                            :color="isHovering ? (activeItem === item.id?'info':'card_active') : (activeItem === item.id?'info':undefined)">
                                        <div style="height: 100%;width: 100%">
                                            <v-row class="ma-0 pa-0 bg-blue-grey-lighten-5" style="height:30%;width: 100%"
                                                   justify="center" align="center">
                                                <p style="font-size: 13px;color: blue" class="font-weight-bold mt-2">
                                                    {{item.name}}</p>
                                            </v-row>
                                            <v-divider></v-divider>

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
                    <v-row class="ma-0 pa-0 border-t" style="height: 40px;width: 100%" align="center" justify="end">
                        <v-btn @click="saveBtn" class="font-weight-bold ml-2" variant="tonal" color="dark_blue" height="30px" size="x-small">
                            انتخاب مدل
                            <v-icon class="mr-1">mdi-content-save</v-icon>
                        </v-btn>
                    </v-row>
                </v-row>

            </v-fade-transition>

        </div>
        <v-divider></v-divider>
    </div>


</template>

<script lang="ts">
    import {defineComponent, onMounted, ref, watch} from "vue";

    import {useStore} from "vuex";
    import {useRouter} from "vue-router";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {AnalyzeListItem, ProcessOutput} from "@/models/Analyze.interface";
    import {useToast} from "primevue/usetoast";



    export default defineComponent({
        name: "SetModelAsModelInputComponent",
        components: {},
        setup() {
            const store = useStore()
            const router = useRouter()
            const toast = useToast()

            const {getAnalyzeList, analyzeListValue, getAnalyzeGroupList, analyzeGroupListValue} = analyze_functions()

            const initData = ref(false)
            const analyzeListValueSearch = ref<AnalyzeListItem[]>([])

            onMounted(async () => {
                await getAnalyzeList()
                // /-------------
                const filterProcessOutputGeometry = analyzeListValue.value.filter((analyze)=>{
                    return analyze.process.output_type === ProcessOutput.Geometry
                })
                analyzeListValue.value = [...filterProcessOutputGeometry]
                // /-------------
                analyzeListValueSearch.value = analyzeListValue.value
                await getAnalyzeGroupList()

                setTimeout(() => {
                    initData.value = true
                }, 300)
            })



            return {
                store, router,initData,analyzeGroupListValue,analyzeListValueSearch,analyzeListValue,toast
            }
        },
        data() {
            return {
                searchCol:2,
                topicShow:true,


                activeItem: 0,

                modelSearchText: null,


            };
        },
        props: {},
        watch: {
            modelSearchText(newValue, oldValue) {
                this.analyzeListValueSearch = this.analyzeListValue.filter((i) => {
                    return i.name.includes(newValue)
                })
            }
        },
        emits:['getFeaturesData'],
        methods: {
            setActiveItem(id: number) {
                this.activeItem = id
            },
            searchFocus(){
                this.searchCol=6
                if (window.innerWidth<=600)
                    this.topicShow=false
            },
            searchFocusOut(){
                this.searchCol=2
                setTimeout(()=>{this.topicShow=true},600)
            },

            filterAnalyzeGroup(groupName: string) {
                if (groupName === 'همه'){
                    this.analyzeListValueSearch = this.analyzeListValue
                }else {
                    this.analyzeListValueSearch = this.analyzeListValue.filter((i) => {
                        return i.group.name === groupName
                    })
                }

            },

            saveBtn(){
                if (this.activeItem === 0){
                    {
                        this.toast.add({
                            group: 'br',
                            life: 2000,
                            severity: 'error',
                            summary: ' خطا در عملیات',
                            detail: 'مدلی انتخاب نشده است'
                        });
                    }
                }else {
                    this.$emit('getFeaturesData',{
                        type:'model',
                        data:this.activeItem
                    })

                    this.$toast.add({
                        group: 'tr',
                        life: 3000,
                        severity: 'success',
                        summary: ' نتیجه درخواست',
                        detail: 'تنظیمات اعمال شد'
                    });
                    this.$router.push({name: 'setModelInput'})
                }
            }
        },

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    @media only screen and (max-width: 600px) {
        .header_font{
            font-size: 10px;
        }
    }
</style>
