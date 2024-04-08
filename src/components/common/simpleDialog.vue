<template>
    <div>
        <v-dialog style="z-index: 100001" v-model="showDialog" scrollable persistent :scrim="overLayer">
            <v-row justify="center" class="ma-0 pa-0">
                <v-card
                        dir="ltr"
                        :width="width"
                        :height="current_height?current_height:null"
                        :max-height="height"
                        style="overflow: auto;"
                        class="rounded-b-lg rounded-t-0 elevation-3"
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
                  z-index: -1 !important;
                  font-size: 12px;
                  height: 20px;
                  color: white;
                  margin-top: -10px;
                "
                                    :class="{ fullbar: fullWindow }"
                                    :style="getWidth()"
                                    class="rounded-t-lg rounded-b-0"
                                    flat
                                    color="dialogBar"
                                    position="fixed"
                                    size="x-small"
                            ><p style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"> {{ topic }}</p>
                            </v-btn
                            >
                        </v-slide-y-transition>
                    </div>
                    <div dir="rtl" style="padding-top: 10px; height: 100%;">
                        <slot></slot>
                    </div>
                </v-card>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";


    export default defineComponent({
        name: "simpleDialogComponent",
        components: {},

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
            current_height:{
              type:String,
              required:false
            },
            overLayer: {
                type: Boolean,
                default: true
            },
            initFull: {
                type: Boolean,
                default: false
            }

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
                if (screen.width < 500 && this.showDialog) {
                    this.fullWindow = true;
                }
            },
        },

        mounted() {
            this.fullWindow = this.initFull
        }
    });
</script>

<style></style>
