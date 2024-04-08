<template>
    <div>
        <v-dialog style="z-index: 100001" v-model="showDialog" @click:outside="dialogClose">
            <v-row justify="center" class="ma-0 pa-0">
                <v-card
                        dir="ltr"
                        :width="width"
                        :height="height"
                        class="rounded-lg"
                        style="background-color: #f3f3f3"

                        :class="{ fullWindowStart1: fullWindow } "
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
                                    class="rounded-t-lg"
                                    flat
                                    color="dialogBar"
                                    position="fixed"
                                    size="x-small"
                            ><p style="text-overflow: ellipsis;white-space: nowrap;overflow: hidden;"> {{ topic }}</p>
                            </v-btn
                            >
                        </v-slide-y-transition>
                    </div>
                    <div dir="rtl" style="padding-top: 10px; height: 100%">
                        <v-layout class="" style="height: 99%;">
                            <v-navigation-drawer
                                    class="myDrawer"
                                    v-model="drawer"
                                    :rail="true"
                                    expand-on-hover
                                    permanent
                                    width="200"
                                    rail-width="50"




                            >
                                <slot name="side"></slot>
                            </v-navigation-drawer>
                            <v-main  style="height: 100%;overflow: auto;">
                                <slot name="main"></slot>
                            </v-main>
                        </v-layout>
                    </div>
                </v-card>
            </v-row>
        </v-dialog>
    </div>
</template>

<script lang="ts">
    import {defineComponent} from "vue";

    export default defineComponent({
        name: "dialogWithSpliterComponent",
        components: {},

        data() {
            return {
                showDialog: false,
                drawer: true,
                items: [
                    { title: 'Home', icon: 'mdi-home-city' },
                    { title: 'My Account', icon: 'mdi-account' },
                    { title: 'Users', icon: 'mdi-account-group-outline' },
                ],
                rail: true,
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
                if (screen.width < 400 && this.showDialog){
                    this.fullWindow = true;
                }
            },
        },

    });
</script>

<style>
    .myDrawer .v-navigation-drawer__content {
        overflow: hidden;
    }
    .myDrawer .v-navigation-drawer__content:hover {
        overflow-y: scroll;
    }
</style>
