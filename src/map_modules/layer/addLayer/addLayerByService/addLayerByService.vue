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
        name: "addLayerByServiceComponent",
        components: {},
        setup() {
            const {saveAddLayerByFile} = layer_functions()

            const childRouteComponent = ref<AddLayerByFile>()
            const store = useStore()
            return {
                childRouteComponent,saveAddLayerByFile,store
            }
        },
        data() {
            return {
                items: [
                    {
                        label: "ایجاد سرویس",
                        to: "service",
                        color: 'purple-lighten-2',
                    },


                ]as { label: string, to: string, color: string }[],
                onboarding: "service"as string,
            };
        },
        props: {
            msg: String,
        },
        methods: {


            async saveLayer() {
                if (this.childRouteComponent) {
                    const res = await this.childRouteComponent.nextPageFunc()

                    if (res.result){
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

                return i == 0;
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
