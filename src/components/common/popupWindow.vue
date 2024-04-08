<template>
    <div style="position: absolute;top: 0;left: 0;width: 100vw;height: 100%;">
        <vue-resizable
                dir="rtl"
                class="resizable rounded-lg elevation-5"
                ref="resizableComponent"
                :dragSelector="dragSelector"
                :active="resize?handlers:[]"
                :fit-parent="fit"
                :max-width="calcPx(max_width)"
                :max-height="calcPx(max_height) "
                :min-width="calcPx(min_width)"
                :min-height="calcPx(min_height) "
                :height="c_height"
                :width="c_width"
                :left="calcPx(left)"
                :top="calcPx(top)"
                @resize:move="eHandler"
                @resize:start="eHandler"
                @resize:end="eHandler"

        >
            <div class="block">
                <div v-if="closeBtn" dir="rtl" class="drag-container rounded-t-lg">
                    <v-row class="pa-0 ma-0" align="center">
                        <v-btn
                                class="mr-n1"
                                width="10px"
                                height="25px"
                                color="white"
                                size="small"
                                variant="text"
                                @click="$emit('closeWindow',true)"
                        >
                            <v-icon>mdi-close</v-icon>
                            <v-tooltip activator="parent" location="right">بستن پنجره</v-tooltip>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <p style="font-size: 14px">{{topic}}</p>
                        <v-spacer></v-spacer>
                        <v-btn
                                class="ml-n1"
                                width="10px"
                                height="25px"
                                color="white"
                                size="small"
                                variant="text"
                                @click="collapseWindow()"

                        >
                            <v-icon>mdi-arrow-collapse</v-icon>
                            <v-tooltip activator="parent" style="z-index: 1000220" location="top">کوچک کردن پنجره</v-tooltip>
                        </v-btn>
                    </v-row>
                </div>

                <div class=" rounded-b-lg" style="position: relative;overflow: auto;"
                     :style="{height:closeBtn?(c_height-25)+'px':(c_height) +'px',width:(c_width)+'px'}">
                    <slot></slot>
                </div>


            </div>
        </vue-resizable>
    </div>

</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";

    import VueResizable from 'vue-resizable'

    export default defineComponent({
        name: "PopupWindowComponent",
        components: {
            VueResizable,
        },


        data() {


            return {
                handlers: ["r", "rb", "b", "lb", "l", "lt", "t", "rt"],
                fit: true,
                dragSelector: ".drag-container,.drag-container2,.drag-container3",

                c_height: 0,
                c_width: 0
            };
        },
        emits: ['closeWindow','resize'],

        props: {
            initSelected: {
                type: Array as PropType<any>,
                required: false,
            },
            topic: {
                type: String,
                default: '',
                required: false,
            },
            top: {
                type: String,
                default: '5px',
                required: false,
            },
            left: {
                type: String,
                default: '5px',
                required: false,
            },

            height: {
                type: String,
                default: '0px',
                required: false,
            },
            width: {
                type: String,
                default: '0px',
                required: false,
            },
            min_height: {
                type: String,
                default: '10dvh',
                required: false,
            },
            min_width: {
                type: String,
                default: '10vw',
                required: false,
            },
            max_height: {
                type: String,
                default: '100dvh',
                required: false,
            },
            max_width: {
                type: String,
                default: '100vw',
                required: false,
            },
            closeBtn: {
                type: Boolean,
                default: false,
                required: false,
            },
            resize: {
                type: Boolean,
                default: true,
                required: false,
            },
        },

        methods: {
            eHandler(data: any) {
                this.c_height = data.height;
                this.c_width = data.width;
                this.$emit('resize',true)

            },

            collapseWindow() {
                if (this.c_height === 30)
                    this.c_height = this.calcPx(this.height)
                else
                    this.c_height = 30
            },

            calcPx(data: string): number {

                if (data.search('vh') !== -1) {
                    const val = parseFloat(data.split('vh')[0])
                    return this.vh(val)
                } else if (data.search('vw') !== -1) {
                    const val = parseFloat(data.split('vw')[0])
                    return this.vw(val)
                } else {
                    return parseFloat(data.split('px')[0])
                }
            },
            vh(percent: number) {
                const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                return (percent * h) / 100;
            },
            vw(percent: number) {
                const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                return (percent * w) / 100;
            }
        },

        mounted(): void {
            this.c_height = this.calcPx(this.height)
            this.c_width = this.calcPx(this.width)

        },

        watch: {},


    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .resizable {
        background-position: top left;
        padding: 0;
        position: relative;
        z-index: 10001;

    }

    .drag-container {
        height: 25px;
        background-color: rgb(var(--v-theme-dialogBar));
        color: white;
        cursor: move;
    }

    .drag-container2 {
        height: 8px;
        background-color: rgb(var(--v-theme-dialogBar));
        color: white;
        cursor: move;
    }
</style>
