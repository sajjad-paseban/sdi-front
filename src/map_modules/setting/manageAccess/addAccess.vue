<template>
    <v-slide-y-transition>
        <div
                v-if="show"
                style="height: 100%; width: 100%; background-color: #f3f3f33b;overflow: auto;"
        >

            <v-row class="ma-0 pa-0 " justify="center" style="height: 100%">
                <v-col cols="12" md="10" class="py-2 " >
                    <v-fade-transition>
                        <v-row v-if="!initData" class="pa-0 ma-0 " align="center" style="height: 100%" justify="center">
                            <v-progress-circular
                                    :size="50"
                                    color="primary"
                                    indeterminate
                            ></v-progress-circular>
                        </v-row>
                    </v-fade-transition>
                    <v-form v-if="initData" ref="addAccessForm" class="myForm rounded elevation-2 pa-3"
                            style="width: 100%; height: 100%;background-color: white;">
                        <v-row class="ma-0 pa-0">
                            <v-col cols="12" md="4" class="ma-0">
                                <v-text-field density="compact" type="text" variant="solo" :rules="nameRule" required v-model="access['f_name']">
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نام فارسی دسترسی</p>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="4" class="ma-0">
                                <v-text-field :rules="nameRule" type="text" density="compact" variant="solo" required v-model="access.e_name">
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-format-color-text"/>
                                    </template>

                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">نام انگلیسی دسترسی</p>
                                    </template>
                                </v-text-field>
                            </v-col>
                            <v-col cols="12" md="4">
                                <v-autocomplete
                                        :items="accesses"
                                        density="compact"
                                        item-title="e_name"
                                        v-model="access.parent"
                                        item-value="id"
                                        variant="solo"
                                        required
                                >
                                    <template v-slot:prepend-inner>
                                        <v-icon color="primary" icon="mdi-sitemap"/>
                                    </template>


                                    <template v-slot:label>
                                        <!-- <p  class="text-primary">نام لایه</p> -->
                                        <p class="">دسترسی والد</p>
                                    </template>
                                </v-autocomplete>
                            </v-col>


                        </v-row>
                        <v-row
                                class="ma-0 pa-0  rounded elevation-2"
                                style="background-color: white;"
                                dir="ltr"
                        >
                            <PickList
                                    v-if="apisData"
                                    v-model="apisData"
                                    listStyle="height: 300px"
                                    style="width: 100%; "
                                    dataKey="id"
                                    :showSourceControls="false"
                                    :showTargetControls="false"
                            >
                                <template #sourceheader>
                                    <div class="myForm" dir="rtl">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                v-model="serchValue"
                                                @update:model-value="filterItems()"
                                                prepend-inner-icon="mdi-filter-outline"
                                                label="جستجو"
                                        ></v-text-field>
                                    </div>
                                </template>
                                <template #targetheader>
                                    <div class="myForm" dir="rtl">
                                        <v-text-field
                                                density="compact"
                                                variant="solo"
                                                label="api های انتخاب شده"
                                        ></v-text-field>
                                    </div>
                                </template>
                                <template #item="slotProps">
                                    <p style="font-size: 10px">{{ slotProps.item.text }}</p>
                                </template>
                            </PickList>
                        </v-row>

                        <v-row class="ma-0 pa-0" justify="end" align="center">
                            <v-checkbox v-model="access.is_active" label="وضعیت "></v-checkbox>
                            <v-spacer/>
                            <v-btn
                                    class="elevation-1"
                                    variant="tonal"
                                    append-icon="mdi-content-save"
                                    style="font-weight: bold !important; font-size: 10px"
                                    rounded="lg"
                                    size="small"
                                    color="primary"
                                    @click="addAccess"
                            >ذخیره
                            </v-btn
                            >
                        </v-row>
                    </v-form>
                </v-col>
            </v-row>
        </div>
    </v-slide-y-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import PickList from "primevue/picklist";
    import access from "@/componentFunctions/access_functions";
    import VForm from "@/models/VForm.interface";
    import rules from "@/componentFunctions/rules_functions";
    import {AddAccessSDModel} from "@/api/access/SD.Models/addAccess.sd";
    import {Access, MyApi} from "@/models/Access.interface";
    import Api from "@/api/access/routes";
    import {useToast} from "primevue/usetoast";

    export default defineComponent({
        name: "addAccessComponent",
        components: {PickList},

        setup() {
            const {accesses, apis,getAllApis,getAccesses} = access()
            const {nameRule}= rules()
            const toast = useToast()
            const initData = ref(false)

            onMounted(async ()=>{
                await getAccesses()
                await getAllApis()
                initData.value = true
            })

            const addAccessForm = ref<VForm>()

            const apisData =ref<[MyApi[],MyApi[]]>([apis.value,[]])


            return {
                apisData, accesses,apis,addAccessForm,nameRule,toast,initData
            }



        },

        data: function () {
            return {
                show: false,



                serchValue: "",

                access: {
                    f_name: '',
                    e_name: '',
                    parent:null,
                    is_active:true,
                    apis:[]
                }as AddAccessSDModel,


            };
        },
        props: {},
        watch:{
            apis(){
                this.apisData=[this.apis,[]]
            },



        },
        methods: {
            filterItems: function () {

                let items = this.apis.filter((item) => {
                    return item.text.includes(this.serchValue);
                });

                this.apisData[0] = [...items];

            },

            addAccess: async function () {
                if (this.addAccessForm) {
                    // this.loginLoading = true
                    const res = await this.addAccessForm.validate()

                    if (res.valid) {
                        console.log(this.apisData[1])
                        this.access.apis = this.apisData[1].map((my_api) => {
                            return my_api.text
                        })

                        const response = await Api.addAccess<Access[]>(this.access,this.toast)

                        if (response.result) {
                            this.$router.push({name:'manageAccessList'})
                            this.toast.add({group: 'tr', life: 7000, severity: 'success', summary: ' نتیجه دخواست', detail: 'دسترسی اضافه شد '});

                        }


                    }else {
                        this.addAccessForm.scrollIntoView()
                    }
                }
            }
        },
        mounted() {
            setTimeout(() => {
                this.show = true;
            }, 100);
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
