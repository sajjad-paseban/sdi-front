<template>
    <div class="" style=" height:100%;">


        <div style="height: calc(100% - 57px)">
            <router-view v-slot="{ Component }">
                <component ref="childRouteComponent" :is="Component"/>
            </router-view>

        </div>

        <v-row class="  ma-0 pa-0 px-2 border-t " justify="space-between" style="height:57px" align="center">
            <v-btn
                    :disabled="false"
                    icon

                    style="font-weight: bold !important"
                    v-tooltip.top="'بازگشت به لیست مدل ها'"
                    size="x-small"
                    @click="router.push({name:'analyzeModelsList'})"
                    color="info"
            >
                <v-icon>mdi-view-grid</v-icon>

            </v-btn>
            <div style="width:70%;height:100%;overflow-x: auto;white-space: nowrap">
                <v-timeline side="end" align="center" class="ma-0 pa-0 " size="x-small" line-inset="12"
                            direction="horizontal">
                    <v-timeline-item v-for="(item) in items"
                                     :key="item.to" :dot-color="onboarding===item.to?'blue':null"
                                     :class="onboarding===item.to?'font-weight-bold':''"

                                     size="x-small" style="font-size: 11px">

                        {{item.label}}
                    </v-timeline-item>


                </v-timeline>
            </div>
            <v-btn
                    v-if="onboarding !== 'setModelOutput' "
                    @click="nextPage()"
                    class="d-flex d-sm-none"
                    variant="tonal"
                    style="font-weight: bold !important"
                    v-tooltip.top="'بعدی'"
                    size="x-small"
                    icon="mdi-chevron-left"
                    color="blue"
            ></v-btn>

            <v-btn
                    v-if="onboarding !== 'setModelOutput' "
                    class="rounded-lg d-none d-sm-flex"
                    @click="nextPage()"

                    style="font-weight: bold !important"
                    v-tooltip.top="'بعدی'"
                    size="x-small"

                    color="blue"
            >
                <p>مرحله بعد</p>
            </v-btn>

            <v-btn
                    v-else
                    @click="saveModel()"
                    variant="tonal"
                    style="font-weight: bold !important"
                    v-tooltip.top="'ذخیره'"
                    size="x-small"
                    icon="mdi-content-save"
                    color="blue"
            ></v-btn>

        </v-row>


    </div>

</template>

<script lang="ts">


    import {defineComponent, ref} from "vue";
    import layer_functions from "@/componentFunctions/layer_functions";
    import {AddAnalyzeRef} from "@/models/ChildComponentRef.interface";
    import {useStore} from "vuex";
    import {AddAnalyze, AnalyzeConfig, ProcessInput} from "@/models/Analyze.interface";
    import analyze_functions from "@/componentFunctions/analyze_functions";
    import {useRouter} from "vue-router";


    export default defineComponent({
        name: "AddModelAnalyze",
        components: {},

        setup() {
            const {addAnalyzeModel} = analyze_functions()
            const store = useStore()
            const router = useRouter()

            const childRouteComponent = ref<AddAnalyzeRef>()

            return {
                childRouteComponent, addAnalyzeModel, store,router
            }
        },

        data() {
            return {
                items: [
                    {
                        label: "شروع ایجاد مدل",
                        to: "addModelConfig",
                        color: 'purple-lighten-2',
                    },

                    {
                        label: "انتخاب عملیات پردازشی",
                        to: "setModelProcess",
                        color: 'purple-lighten-2',
                    },

                    {
                        label: "انتخاب ورودی",
                        to: "setModelInput",
                        color: 'amber-lighten-1',
                    },
                    {
                        label: "انتخاب نوع خروجی",
                        to: "setModelOutput",
                        color: 'amber-lighten-1',
                    },


                ] as { label: string, to: string, color: string }[],
                onboarding: "addModelConfig" as string,


                analyze: {
                    config:null,
                    process:null,
                    inputs:[],
                    export_type:null
                } as AddAnalyze
            };
        },
        props: {
            msg: String,
        },
        methods: {
            async nextPage() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc(this.analyze)
                    if (res.result){
                        let i = this.items.findIndex((item) => {
                            return item.to === this.$route.name;
                        });

                        this.onboarding = this.items[i + 1].to
                        if (this.onboarding === this.items[2].to){
                            this.$router.push({
                                name: this.onboarding,
                                params:{inputType:this.analyze.process?.input_type,processName:this.analyze.process?.p_name}
                            });
                        }else {
                            this.$router.push({
                                name: this.onboarding,
                            });
                        }
                    }
                }
            },

            async saveModel() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc(this.analyze)
                    if (res.result){
                        const res = await this.addAnalyzeModel(this.analyze)
                        if (res){
                            this.$toast.add({
                                group: 'tr',
                                life: 3000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'مدل با موفقیت اضافه شد .'
                            });
                            this.$router.push({name: 'analyzeModelsList'})
                        }
                    }


                }
            },
            prevPage() {
                let i = this.items.findIndex((item) => {
                    return item.to === this.$route.path;
                });
                this.onboarding = this.items[i - 1].to
                this.$router.push(this.items[i - 1].to);
            },

            addAnalyzeConfig(data: AnalyzeConfig) {
                if (this.analyze)
                    this.analyze.config = data
            }


        },


        computed: {
            nextEnable() {
                let i = this.items.findIndex((item) => {
                    return item.to === this.$route.path;
                });

                return i == 2;
            },

            perEnable() {
                let i = this.items.findIndex((item) => {
                    return item.to === this.$route.path;
                });

                return i == 0;
            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .v-timeline--horizontal.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__body {
        padding-block-start: 1px !important;
    }

    .v-timeline--horizontal.v-timeline.v-timeline--side-end .v-timeline-item .v-timeline-item__opposite {

        padding-block-end: 7px !important;

    }
</style>
