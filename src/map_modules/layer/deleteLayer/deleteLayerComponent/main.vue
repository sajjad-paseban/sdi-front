<template>

    <div style="background-color:#f3f3f3;width: 100%;height: 100%" dir="rtl" class="pa-1 px-2 pt-0 mt-n1">
        <div style="height: 100%">
            <v-row class="ma-0 pa-0">
                <v-btn size="small" variant="tonal" color="primary" class="rounded-lg mr-2 mt-2">حذف
                    لایه
                </v-btn>
            </v-row>
            <div class="rounded-lg mt-n4 pt-4  "
                 style="width: 100%;height: calc(100% - 22px);">
                <div class="pa-2" style="height: 100%">
                    <div
                            class="ma-0 pa-0 elevation-1 rounded-lg bg-white"
                            style="height: 100%; display: grid; overflow: auto"
                    >
                        <div class="pa-2 mysub">
                            <v-row class="ma-0 pa-0">
                                <p style="font-size: 10px; line-height: 20px">
                                    برای حذف لایه انتخابی فیلد های زیر را پر کنید.
                                </p>
                            </v-row>

                        </div>
                        <v-row class="ma-0 pt-0" style="align-items: center; height: calc(100% - 24px)">
                            <v-form class="myForm" style="width: 100%; height: 100%">
                                <v-row class="pa-0 ma-0" style="height: 80% ;">
                                    <v-col cols="12" sm="4" class="pa-0 ma-0 ">
                                        <v-checkbox class="font-weight-bold text-black" color="primary"
                                                    v-model="deleteLayerFile" label="حذف فایل لایه"></v-checkbox>

                                    </v-col>

                                    <v-col cols="12" sm="4" class="pa-0 ma-0">
                                        <v-checkbox class="font-weight-bold text-black" color="primary" :disabled="true"
                                                    label="پاک کردن تاریخچه "></v-checkbox>

                                    </v-col>


                                </v-row>
                                <v-row class="ma-0 pa-0 mt-2" justify="end" style="height: 20%" align="end">
                                    <v-btn
                                            class="elevation-1 ml-2"
                                            variant="tonal"
                                            append-icon="mdi-delete"
                                            style="font-weight: bold !important; font-size: 10px"
                                            rounded="lg"
                                            @click="deleteBtn"
                                            size="small"
                                            color="error"
                                    >حذف
                                    </v-btn
                                    >
                                </v-row>
                            </v-form>
                        </v-row>

                    </div>
                </div>


            </div>

        </div>
    </div>

</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {useStore} from "vuex";
    import layer_functions from "@/componentFunctions/layer_functions";


    export default defineComponent({
        name: "MainDeleteLayer",
        setup() {
            const store = useStore()

            const {deleteLayer} = layer_functions()

            return {store, deleteLayer}
        },
        props: {
            layerId: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                deleteLayerFile: false
            }
        },
        methods: {

            deleteBtn() {
                this.store.commit('setConfirmDialog', {
                    massage: 'آیا حذف مورد تایید است ؟',
                    topic: 'اخطار',
                    active: true,
                    accept: async () => {
                        const response = await this.deleteLayer({with_files: this.deleteLayerFile}, this.layerId)
                        if (response){
                            this.$toast.add({
                                group: 'tr',
                                life: 3000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: 'لایه حذف شد '
                            });
                            setTimeout(()=>{
                                this.$router.push({name:'home'})
                            },1500)
                        }
                    },
                    reject: () => {
                        console.log('reject')
                    },

                })
            }
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
