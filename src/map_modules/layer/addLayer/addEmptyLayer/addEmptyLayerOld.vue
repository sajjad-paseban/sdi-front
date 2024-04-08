<template>
    <div class="pb-1 px-2 " style="min-width: 400px; height:100%;">
        <Steps
                style="height: 35px"
                :model="items"

                :readonly="true"
        />

        <div style="height: calc(100% - 35px);">
            <div style="height: calc(100% - 30px)">

                <router-view></router-view>
            </div>

            <v-row
                    class="ma-0 pa-0 pb-1"
                    style="min-height: 30px;"
                    align="end"
            >
                <v-btn
                        :disabled="perEnable"
                        @click="prevPage()"
                        variant="tonal"
                        icon="mdi-chevron-right"
                        style="font-weight: bold !important"
                        v-tooltip.top="'قبلی'"
                        size="x-small"
                        color="primary"
                >

                </v-btn>

                <v-spacer></v-spacer>

                <v-btn
                        :disabled="nextEnable"
                        class=""
                        @click="nextPage()"
                        variant="tonal"

                        style="font-weight: bold !important"
                        v-tooltip.top="'بعدی'"
                        size="x-small"
                        icon="mdi-chevron-left"
                        color="primary"
                ></v-btn
                >
            </v-row>
        </div>
    </div>
</template>

<script lang="ts">
    interface Item {
        label: string;
        to: string;
    }

    import {defineComponent} from "vue";

    import Steps from "primevue/steps";

    // import Uploud from "../uploud.vue";

    export default defineComponent({
        name: "AddLayer",
        components: {Steps},

        data() {
            return {
                items: [

                    {
                        label: "مشخصات لایه",
                        to: "/layer/addLayer/addEmptyLayer/layerConfig",
                    },
                    {
                        label: "مشخصات ظاهر ",
                        to: "/layer/addLayer/addEmptyLayer/layerStyleConfig",
                    },
                    {
                        label: "اقلام توصیفی",
                        to: "/layer/addLayer/addEmptyLayer/layerMetaData",
                    },
                    {
                        label: "کنترل نهایی",
                        to: "/layer/addLayer/addEmptyLayer/saveLayer",
                    },
                ],
            };
        },
        props: {
            msg: String,
        },
        methods: {
            nextPage() {
                let i = this.items.findIndex((item) => {
                    if (item.to === this.$route.path) {
                        return true;
                    } else {
                        return false;
                    }
                });

                this.$router.push(this.items[i + 1].to);
            },
            prevPage() {
                let i = this.items.findIndex((item) => {
                    if (item.to === this.$route.path) {
                        return true;
                    } else {
                        return false;
                    }
                });

                this.$router.push(this.items[i - 1].to);
            },
            complete() {
                console.log("s");
            },
        },

        computed: {
            nextEnable() {
                let i = this.items.findIndex((item) => {
                    if (item.to === this.$route.path) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (i == 3) {
                    return true;
                } else {
                    return false;
                }
            },

            perEnable() {
                let i = this.items.findIndex((item) => {
                    if (item.to === this.$route.path) {
                        return true;
                    } else {
                        return false;
                    }
                });

                if (i == 0) {
                    return true;
                } else {
                    return false;
                }
            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style></style>
