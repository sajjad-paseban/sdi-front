<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;   overflow: auto;"
        >
            <div class="pa-2 mysub">
                <v-row class="ma-0 pa-0">
                    <p style="font-size: 10px; line-height: 20px">
                        در این بخش با انتخاب و پر کردن فیلد های زیر میتوانید گروه مورد نظر
                        خود را ایجاد نمایید .
                    </p>
                </v-row>
            </div>
            <v-fade-transition>
                <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                    <v-progress-circular
                            :size="50"
                            color="primary"
                            indeterminate
                    ></v-progress-circular>
                </v-row>
            </v-fade-transition>
            <v-row v-if="initData" class="ma-0 pa-0" justify="center">
                <v-col cols="12" md="10" class="py-2">
                    <v-form ref="myEditGroupForm" class="myForm" style="width: 100%; height: 100%">
                        <v-row
                                class="ma-0 pa-2 rounded-lg elevation-2"
                                style="background-color: white"
                        >
                            <v-col class="ma-0 pa-0" cols="12">
                                <v-row class="pa-0 ma-0">
                                    <v-col cols="12" md="4" class="ma-0">
                                        <v-text-field v-model="name" density="compact" variant="solo" :rules="nameRule"
                                                      required>
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-format-color-text"/>
                                            </template>

                                            <template v-slot:label>
                                                <!-- <p  class="text-primary">نام لایه</p> -->
                                                <p class="">نام گروه</p>
                                            </template>
                                        </v-text-field>
                                    </v-col>


                                </v-row>
                                <v-row class="pa-0 ma-0">


                                    <v-col cols="12" sm="4">
                                        <v-autocomplete
                                                :disabled="!activeParent"
                                                v-model="parent_id"
                                                :items="layerGroupList"
                                                density="compact"
                                                item-title="name"
                                                variant="solo"
                                                item-value="id"
                                                :rules="activeParent?nameRule:[]"

                                        >
                                            <template v-slot:prepend-inner>
                                                <v-icon color="primary" icon="mdi-sitemap"/>
                                            </template>

                                            <template v-slot:label>
                                                <p class="">گروه والد</p>
                                            </template>
                                        </v-autocomplete>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-col cols="12" sm="2" class="mb-n8">
                                        <v-switch v-model="activeParent" color="primary" density="compact">
                                            <template v-slot:prepend>
                                                <p class="text-caption">والد دارد</p>
                                            </template>
                                        </v-switch>
                                    </v-col>
                                    <v-spacer></v-spacer>
                                    <v-spacer></v-spacer>
                                </v-row>


                            </v-col>

                            <v-row class="ma-0 pa-0 mt-2" justify="end">
                                <v-btn
                                        class="elevation-1"
                                        variant="tonal"
                                        append-icon="mdi-content-save"
                                        style="font-weight: bold !important; font-size: 10px"
                                        rounded="lg"
                                        @click="saveLayerGroup"
                                        size="small"
                                        color="primary"
                                >ذخیره
                                </v-btn
                                >
                            </v-row>
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import rules from "@/componentFunctions/rules_functions";
    import {useToast} from "primevue/usetoast";
    import VForm from "@/models/VForm.interface";

    import {useRoute, useRouter} from "vue-router";
    import layerGroupFunctions from "@/componentFunctions/layerGroup_functions";

    export default defineComponent({
        name: "addUserComponent",
        components: {},


        setup() {

            const {list,layerGroupList,getItemLayerGroup,groupItem,editLayerGroup} = layerGroupFunctions()

            const {nameRule} = rules()
            const toast = useToast()
            const router = useRouter()
            const route = useRoute()
            const myEditGroupForm = ref<VForm>()

            const activeParent = ref<boolean>(false)
            const name = ref<string>('')
            const parent_id = ref<null|number>(null)



            const initData = ref(false)

            onMounted(async () => {
                await list()
                if (!route.params.data) {

                    toast.add({
                        group: 'br',
                        life: 4000,
                        severity: 'error',
                        summary: ' خطا',
                        detail: 'گروه انتخاب نشده است '
                    });
                    router.go(-1)
                } else {
                    console.log(String(route.params.data))
                    if (typeof route.params.data === 'string') {
                        await getItemLayerGroup(parseInt(route.params.data))

                        if (!groupItem.value) {
                            toast.add({
                                group: 'br',
                                life: 4000,
                                severity: 'error',
                                summary: ' خطا',
                                detail: 'خطا در گرفتن اطلاعات نقش'
                            });
                            router.go(-1)
                        }else {
                            await list()

                            name.value = groupItem.value.name
                            parent_id.value = groupItem.value.parent
                            activeParent.value = !!groupItem.value.parent

                            setTimeout(() => {
                                initData.value = true
                            }, 300)
                        }
                    }
                }
            })
            return {
                nameRule, toast, myEditGroupForm, initData,activeParent,name,parent_id,layerGroupList,editLayerGroup,groupItem
            }
        },


        data() {
            return {
                show: false,


                userImageFile: [],


            };
        },
        props: {},
        methods: {
            async saveLayerGroup() {

                if (this.myEditGroupForm) {
                    const res = await this.myEditGroupForm.validate()
                    console.log(this.groupItem)
                    if (res.valid && this.groupItem && this.groupItem.id) {

                        const response = await this.editLayerGroup({name: this.name, parent: this.activeParent?this.parent_id:null},this.groupItem.id)
                        if (response) {
                            this.$toast.add({
                                group: 'tr',
                                life: 7000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'گروه لایه ویرایش شد '
                            });

                            this.$router.push({name:'groupLayerList'})

                        }
                    }
                }
            },
        },
        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 500);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
