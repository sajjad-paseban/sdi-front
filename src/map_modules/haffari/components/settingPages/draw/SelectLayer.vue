<template>
    <div class="pa-2" dir="rtl" style="height: 100%;width: 100%;min-width: 400px;">
        <div
             class="pa-0 ma-0 mt-4 pa-2 rounded-lg elevation-2 border"
             style="height: max-content;width: 100%"
        >
            <Tree
                v-for="item in layersTree"
                :key="item.id"
                :item="item"
                :label="'name'"
                :image="'image'"
                :key-object="'id'"
                @checkBoxChange="checkBoxChange"
                :activeCheckBox="true"
                dir="rtl"
            >
                <template #action="actionPrps">

                    <v-row class="ma-0 pa-0 mb-1" justify="end">
                        <v-btn
                            variant="text"
                            size="x-small"
                            color="primary"
                            class="rounded-lg ml-1"
                            :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.edit?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"

                        >
                            <v-avatar size="20" class="">
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
                            color="primary"
                            class="rounded-lg ml-1"
                            :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.delete?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"

                        >
                            <v-avatar size="20" class="">
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
                            color="primary"
                            class="rounded-lg ml-1"
                            :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.show?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"

                        >
                            <v-avatar size="20" class="">
                                <v-img
                                    class=""
                                    src="@/assets/icons/see.png"
                                    alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                        <v-btn
                            variant="text"
                            size="x-small"
                            color="primary"
                            class="rounded-lg"
                            :style="actionPrps.item.layer_access?(actionPrps.item.layer_access.active_layer?'background-color: rgb(var(--v-theme-primary_active2))!important':''):''"

                        >
                            <v-avatar size="20" class="">
                                <v-img
                                    class=""
                                    src="@/assets/icons/active.png"
                                    alt="John"
                                ></v-img>
                            </v-avatar>
                        </v-btn>
                    </v-row>

                </template>
            </Tree>
        </div>
    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType, Ref} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import rules from "@/componentFunctions/rules_functions";
import Tree from "@/components/common/tree.vue";

export default defineComponent({
    name: "SelectLayerComponent",

    components: {Tree},


    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()
        const {nameRule, floatRule, phoneRule} = rules()

        const initData = ref(false)
        const layersTree = ref(store.getters.getLayersTree)

        onMounted(async () => {

            console.log(layersTree.value, 'ssss')
            setTimeout(() => {
                initData.value = true
            }, 500)
        })

        return {
            store,
            toast,
            router,
            nameRule,
            initData,
            layersTree
        }
    },
    computed: {},
    data() {
        return {
            //--------for tree-----------//
            selectResult: [] as number[],
            //--------for tree-----------//
        }
    },
    methods: {
        //--------for tree-----------//
        checkBoxChange(data: { value: boolean; id: number }) {
            if (data.value) {
                this.selectResult.push(data.id);
            } else {
                this.selectResult = this.selectResult.filter((e) => e !== data.id);
            }

            this.selectResult = [...new Set(this.selectResult)];

        },

        treeItemClick(item: any) {
            console.log(item);
        },
        //--------for tree-----------//
    },

    watch: {},


});
</script>


<style>


</style>
