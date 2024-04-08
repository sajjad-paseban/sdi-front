<template>
    <div>
        <v-dialog v-model="showDialog" @click:outside="dialogClose">
            <v-row justify="center" class="ma-0 pa-0">
                <v-card
                        dir="ltr"
                        :width="width"
                        :height="height"
                        :class="{ fullWindowStart1: fullWindow }"
                >
                    <div class="startBar">
                        <v-btn
                                style="z-index: 1001 !important; margin-top: -10px"
                                class="ml-1"
                                width="20px"
                                height="20px"
                                position="fixed"
                                color="white"
                                size="small"
                                variant="text"
                                @click="dialogClose"
                        >
                            <v-icon>mdi-close</v-icon>
                        </v-btn
                        >
                        <v-btn
                                style="z-index: 1001 !important; margin-top: -10px"
                                class="ml-8"
                                width="20px"
                                height="20px"
                                left=""
                                position="fixed"
                                color="white"
                                size="small"
                                variant="text"
                                @click="maximizeStart"
                        >
                            <v-icon v-if="fullWindow">mdi-window-minimize</v-icon>
                            <v-icon v-else>mdi-window-maximize</v-icon>
                        </v-btn>
                    </div>

                    <div dir="rtl">
                        <v-slide-y-transition>
                            <v-btn
                                    style="
                  z-index: 1000 !important;
                  font-size: 12px;
                  height: 20px;
                  color: white;
                  margin-top: -10px;
                "
                                    :class="{ fullbar: fullWindow }"
                                    :style="getWidth()"

                                    flat
                                    color="dialogBar"
                                    position="fixed"
                                    size="x-small"
                            >{{ topic }}
                            </v-btn
                            >
                        </v-slide-y-transition>
                    </div>
                    <div dir="ltr" style="padding-top: 10px; height: 100%">
                        <Splitter style="height: 100%" class="ma-0 pa-0">
                            <SplitterPanel
                                    class=""
                                    dir="rtl"
                                    :size="80"
                                    style="
                  background-color: rgb(243, 243, 243);
                  overflow-y: auto !important;
                "
                            >
                                <slot name="main"></slot>
                            </SplitterPanel>

                            <SplitterPanel
                                    dir="rtl"
                                    class=""
                                    style="overflow-y: auto !important; min-width: 55px !important"
                                    :size="20"
                            >
                                <slot name="side"></slot>
                            </SplitterPanel>
                        </Splitter>
                    </div>
                </v-card>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";

    import Splitter from "primevue/splitter";
    import SplitterPanel from "primevue/splitterpanel";

    export default defineComponent({
        name: "dialogWithSpliterComponent",
        components: {
            Splitter,
            SplitterPanel,
        },

        data() {
            return {
                showDialog: false,

                fullWindow: false,
            };
        },

        props: {
            show: Boolean,
            topic: String,
            width: String,
            height: String,
        },

        methods: {
            dialogClose() {
                this.$emit("closeDialog", false);
            },
            maximizeStart() {
                this.fullWindow = !this.fullWindow;
            },

            getWidth() {
                return 'width :' + this.width;
            },
        },
        watch: {
            show() {
                this.showDialog = this.show;
            },
        },
    });
</script>

<style></style>
