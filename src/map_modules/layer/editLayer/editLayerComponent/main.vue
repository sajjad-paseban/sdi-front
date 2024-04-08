<template>

    <div style="background-color:#f3f3f3;width: 100%;height: 100%" dir="rtl" class="pa-1 px-2 pt-0 mt-n1">
        <div style="height: 100%">
            <v-row class="ma-0 pa-0">
                <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-2 mt-2">ویرایش
                    لایه
                </v-btn>
            </v-row>
            <div class="rounded-lg mt-n4 pt-4 "
                 style="width: 100%;height: calc(100% - 22px);">
                <div style="width: 100%;height: calc(100% - 48px);">
                    <router-view v-slot="{ Component }">
                        <component ref="childRouteComponent" :is="Component"/>
                    </router-view>
                </div>
                <v-row class="ma-0 pa-0" justify="space-between" style="height:40px">
                    <v-btn

                            variant="tonal"
                            icon="mdi-chevron-right"
                            :disabled="true"
                            style="font-weight: bold !important"
                            v-tooltip.top="'قبلی'"
                            size="x-small"
                            class="mr-1"
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
                            v-if="onboarding !== 'editLayerMeta' "
                            class="ml-1"
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
                            class="ml-1"
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

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import layer_functions from "@/componentFunctions/layer_functions";
    import {AddLayerByFile} from "@/models/ChildComponentRef.interface";
    import {useRouter} from "vue-router";


    export default defineComponent({
        name: "MainEditLayer",

        setup() {
            const {editAddLayerByFile} = layer_functions()
            const router =useRouter()

            const childRouteComponent = ref<AddLayerByFile>()

            return {
                childRouteComponent, editAddLayerByFile,router
            }
        },
        data() {
            return {
                items: [
                    {
                        label: "مشخصات لایه",
                        to: "editLayerConfig",
                        color: 'purple-lighten-2',
                    },


                    {
                        label: "مشخصات ظاهر ",
                        to: "editLayerStyle",
                        color: 'green-lighten-1',
                    },


                    {
                        label: "اقلام توصیفی",
                        to: "editLayerMeta",
                        color: 'amber-lighten-1',
                    },

                ] as { label: string, to: string, color: string }[],
                onboarding: "editLayerConfig" as string,
            }
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
                        console.log(this.onboarding,'ssssssss')
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

                    if (res.data && res.data.id) {
                        const response = await this.editAddLayerByFile({layer_id: res.data.id})
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 3000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'لایه با موفقیت ویرایش شد .'
                            });
                            this.$router.push({name: 'home'})
                        }
                    }
                }
            },
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
