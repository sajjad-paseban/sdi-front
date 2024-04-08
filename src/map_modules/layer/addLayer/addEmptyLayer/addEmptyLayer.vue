<template>
    <div class="pb-1 pa-2 " style=" height:100%;">


        <div style="height: calc(100% - 42px)">
            <router-view v-slot="{ Component }">
                <component ref="childRouteComponent" :is="Component"/>
            </router-view>
        </div>


        <v-row class="ma-0 pa-0" justify="space-between" style="height:40px">
            <v-btn
                    :disabled="true"
                    variant="tonal"
                    icon="mdi-chevron-right"
                    style="font-weight: bold !important"
                    v-tooltip.top="'قبلی'"
                    size="x-small"
                    @click="prevPage()"
                    color="primary"
            >

            </v-btn>
            <v-item-group
                    v-model="onboarding"
                    class="text-center"
                    mandatory
                    style="display: contents;"
            >
                <v-item
                        v-for="(item) in items"
                        :key="item.to"
                        v-slot="{ isSelected }"
                        :value="item.to"
                >
                    <div>
                        <v-btn
                                variant="text"
                                v-tooltip.top="item.label"
                                size="x-small"
                                icon="mdi-record"
                                :color="isSelected?item.color:null"

                        ></v-btn>
                        <p class="timeLineMobileText">{{item.label}}</p>
                    </div>


                </v-item>
            </v-item-group>
            <v-btn
                    v-if="onboarding !== 'emptyLayerMetaData' "
                    class=""
                    @click="nextPage()"
                    variant="tonal"
                    style="font-weight: bold !important"
                    v-tooltip.top="'بعدی'"
                    size="x-small"
                    icon="mdi-chevron-left"
                    color="primary"
            ></v-btn>

            <v-btn
                    v-else
                    @click="saveLayer()"
                    variant="tonal"
                    style="font-weight: bold !important"
                    v-tooltip.top="'ذخیره'"
                    size="x-small"
                    icon="mdi-content-save"
                    color="primary"
            ></v-btn>

        </v-row>

    </div>

</template>

<script lang="ts">


    import {defineComponent, ref} from "vue";
    import layer_functions from "@/componentFunctions/layer_functions";
    import {AddLayerByFile} from "@/models/ChildComponentRef.interface";
    import {useStore} from "vuex";


    export default defineComponent({
        name: "AddLayer",
        components: {},

        setup() {
            const {saveAddLayerByFile} = layer_functions()
            const store = useStore()

            const childRouteComponent = ref<AddLayerByFile>()

            return {
                childRouteComponent,saveAddLayerByFile,store
            }
        },

        data() {
            return {
                items: [

                    {
                        label: "مشخصات لایه",
                        to: "emptyLayerConfig",
                        color: 'purple-lighten-2',
                    },

                    {
                        label: "مشخصات ظاهر ",
                        to: "emptyLayerStyleConfig",
                        color: 'amber-lighten-1',
                    },

                    {
                        label: "اقلام توصیفی",
                        to: "emptyLayerMetaData",
                        color: 'cyan-lighten-1',
                    },

                ]as { label: string, to: string, color: string }[],
                onboarding: "emptyLayerConfig" as string,
            };
        },
        props: {
            msg: String,
        },
        methods: {
            async nextPage() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc()
                    if (res.result && res.data) {
                        let i = this.items.findIndex((item) => {
                            return item.to === this.$route.name;
                        });
                        this.onboarding = this.items[i + 1].to
                        this.$router.push({
                            name: this.onboarding,
                            params: {id: res.data.id, layer_type: res.data.type_layer}
                        });

                    }
                }
            },

            async saveLayer() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc()

                    if (res.data&&res.data.id){
                        const response = await this.saveAddLayerByFile({layer_id:res.data.id})
                        if (response){
                            this.$toast.add({
                                group: 'tr',
                                life: 3000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'لایه با موفقیت اضافه شد .'
                            });
                            window.location.replace(this.store.state.frontUrl);
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
<style></style>
