<template>
    <div class="" style=" height:100%;">


        <div style="height: calc(100% - 57px)">
            <router-view v-slot="{ Component }">
                <component :layerInputData="layerInputData" ref="childRouteComponent" :is="Component"/>
            </router-view>

        </div>

        <v-row class="  ma-0 pa-0 px-2 border-t " justify="space-between" style="height:57px" align="center">
            <v-btn
                    :disabled="true"
                    variant="tonal"
                    icon="mdi-chevron-right"
                    style="font-weight: bold !important"
                    v-tooltip.top="'قبلی'"
                    size="x-small"
                    @click="prevPage()"
                    color="blue"
            >

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
                    v-if="onboarding !== 'filterResult' "
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
                    v-if="onboarding !== 'filterResult' "
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
    import {AddLayerInput} from "@/models/ChildComponentRef.interface";
    import {useStore} from "vuex";
    import {LayerInputData} from "@/models/Analyze.interface";


    export default defineComponent({
        name: "LayerInputComponent",
        components: {},

        setup() {
            const {saveAddLayerByFile} = layer_functions()
            const store = useStore()

            const childRouteComponent = ref<AddLayerInput>()

            return {
                childRouteComponent, saveAddLayerByFile, store
            }
        },

        data() {
            return {
                items: [
                    {
                        label: "شروع انتخاب لایه",
                        to: "",
                        color: 'purple-lighten-2',
                    },

                    {
                        label: "انتخاب لایه",
                        to: "selectLayer",
                        color: 'purple-lighten-2',
                    },

                    {
                        label: "تنظیمات فیلتر",
                        to: "featuresFilter",
                        color: 'amber-lighten-1',
                    },
                    {
                        label: "خروجی فیلتر لایه",
                        to: "filterResult",
                        color: 'amber-lighten-1',
                    },


                ] as { label: string, to: string, color: string }[],
                onboarding: "selectLayer" as string,

                layerInputData:null as LayerInputData|null,
            };
        },
        props: {
            msg: String,
        },
        emits:['getFeaturesData'],
        methods: {
            async nextPage() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc()
                    if (res.result){
                        this.layerInputData = res.data
                        let i = this.items.findIndex((item) => {
                            return item.to === this.$route.name;
                        });
                        this.onboarding = this.items[i + 1].to
                        this.$router.push({
                            name: this.onboarding,
                        });
                    }
                }
            },

            async saveModel() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc()
                    this.$emit('getFeaturesData',{
                        type:'layerInput',
                        data:res.data
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
            },
            prevPage() {
                let i = this.items.findIndex((item) => {
                    return item.to === this.$route.path;
                });
                this.onboarding = this.items[i - 1].to
                this.$router.push(this.items[i - 1].to);
            },


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
