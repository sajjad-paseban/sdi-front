<template>
    <v-row class="ma-0 pa-0 pa-2" align="start" justify="start" style="height:calc(100%);overflow-y: auto;display: flex;align-content: flex-start;">
        <v-col
                v-for="(n,index) in images"
                :key="n"
                class="d-flex child-flex"
                cols="12" sm="4" lg="3"
        >
            <div class="rounded-lg bg-white elevation-3" style="height: 150px;width:100%">
                <v-img
                        @mouseover="n.showCaption=true"
                        @mouseleave="n.showCaption=false"
                        @click="n.showCaption=true"
                        v-if="n.thumb_url"
                        :src="n.thumb_url"
                        cover
                        style="width: 100%;height:100%;display: flex;align-items: flex-end"

                        class="bg-grey-lighten-2 rounded-lg "
                >
                    <template v-slot:placeholder>
                        <v-row
                                class="fill-height ma-0"
                                align="center"
                                justify="center"
                        >
                            <v-progress-circular
                                    indeterminate
                                    color="grey-lighten-5"
                            ></v-progress-circular>
                        </v-row>
                    </template>
                    <v-slide-y-reverse-transition>
                        <div v-if="n.showCaption" style="height:40px;width:100%"
                             class="bg-white rounded-lg-b">
                            <v-row class="ma-0 pa-0 px-1 " style="height:100%" align="center">
                                <v-col cols="6">
                                    <p class="font-weight-bold ellipsis" style="font-size: 10px">{{ n.caption }}</p>
                                </v-col>
                                <v-col cols="6" class="d-flex justify-end pa-0 ">

                                    <v-btn
                                            icon
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            @click="showImage(index,n.panorama)"
                                            style="font-weight: bold !important"
                                            v-tooltip.top="'نمایش'"
                                    >
                                        <v-img
                                                width="15"
                                                class=""
                                                src="@/assets/icons/see.png"
                                                alt="John"
                                        ></v-img>
                                    </v-btn>
                                    <v-btn
                                            v-if="n.id"
                                            icon
                                            variant="text"
                                            size="x-small"
                                            color="primary"
                                            style="font-weight: bold !important"
                                            v-tooltip.top="'تنظیمات'"
                                            @click="editImageInfo(n.id)"
                                    >
                                        <v-avatar size="15" class="">
                                            <v-img
                                                    class=""
                                                    src="@/assets/icons/setting.png"
                                                    alt="John"
                                            ></v-img>
                                        </v-avatar>
                                    </v-btn>
                                </v-col>


                            </v-row>
                        </div>
                    </v-slide-y-reverse-transition>

                </v-img>
            </div>

        </v-col>

        <simple-dialog
                :show="dialog"
                topic=""
                :overLayer="true"
                width="70vw"
                height="80vh"
                @closeDialog="dialog = false"
        >
            <div id="panorama" class="pa-1 " style="overflow-y: auto;height:100%;min-height:70dvh;width:100%">

            </div>

        </simple-dialog>
    </v-row>
</template>

<script lang="ts">
import {defineComponent, onMounted, watch, ref, computed, PropType} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";
import {useRoute, useRouter} from "vue-router";
import SimpleDialog from "@/components/common/simpleDialog.vue";
import {Viewer} from "@photo-sphere-viewer/core";
import {ArchiveImage} from "@/models/Archive.interface";
import {Archive} from "@/models/Survey.interface";


export default defineComponent({
    name: "ArchiveListComponent",

    components: {SimpleDialog},


    props: {
        inputImages:{
            required:true,
            type:Array as PropType<Archive[]>,
            default:[]
        }
    },

    setup(props) {
        const store = useStore();
        const toast = useToast()
        const router = useRouter()
        const route = useRoute()


        return {
            store, toast, router,route
        }
    },

    data() {
        return {
            dialog: false,
            images:[] as ArchiveImage[]
        }
    },
    methods: {
        updateImages(){
            if (this.inputImages){
                this.images = []
                    this.inputImages.map((item:Archive)=>{
                    this.images.push({
                        id:item.id,
                        panorama:item.panorama,
                        url:item.src,
                        thumb_url:item.thumb_src,
                        showCaption:false,
                        caption:item.name,
                        date:item.insert_date
                    })
                })

            }
        },
        showImage(index: number, panorama: boolean) {
            if (panorama) {
                this.showPanorama(index)
            } else {
                this.showSimple(index)
            }

        },
        showPanorama(index: number) {
            this.dialog = true
            setTimeout(() => {
                const viewer = new Viewer({
                    container: 'panorama',
                    caption: '...',
                    loadingImg: '',
                    loadingTxt: 'در حال لود عکس',
                    touchmoveTwoFingers: true,
                    mousewheelCtrlKey: true,
                    defaultYaw: '120deg',
                    navbar: 'zoom move gallery caption fullscreen',
                    panorama: this.images[index].url,
                });

            }, 300)

        },
        showSimple(index: number) {
            this.$viewerApi({
                images: [this.images[index]],
                options: {
                    toolbar: true,
                    url: 'url',
                    initialViewIndex: 0,

                },
            })
        },
        editImageInfo(id:number){
            if (!this.route.fullPath.includes('archive/edit')) {
                this.router.push({path: `${this.route.fullPath}/edit/${id}`})
            }
        }
    },

    watch: {
        inputImages(){
            this.updateImages()
        }
    },
    mounted() {

        this.updateImages()
    }


});
</script>


<style>

.psv-caption-content {
    font-family: "IRANSansWeb UltraLight";
}

.psv-loader-text {
    font-family: "IRANSansWeb UltraLight";
    font-size: 13px;
}

.ellipsis {
    text-overflow: ellipsis; /* enables ellipsis */
    white-space: nowrap; /* keeps the text in a single line */
    overflow: hidden; /* keeps the element from overflowing its parent */
}
</style>
