<template>
    <div>
        <vector_layer :map="map" :z-index="10">
            <template v-if="true" #source="{vector}">
                <vector_source ref="drawVectorSourceRef" :map="map" :vector="vector">
                    <template v-if="true" #snap="{vectorSource}">
                        <snap ref="snapRef" :source="vectorSource" :map="map"></snap>
                    </template>


                    <template v-if="[3,4].includes(activePlugin)"  #draw="{vectorSource}">
                        <draw_interaction :active-modify="true" ref="drawRef" @drawend="drawEvent"
                                          @drawstart="drawEvent"
                                          :map="map"
                                          :source="vectorSource" :type="drawType"></draw_interaction>
                    </template>
                </vector_source>
            </template>

            <template v-if="true" #style="{vector}">
                <Text_style :area="true" :length="true" :number-in-coords="true" :fill-color="'rgba(115,114,114,0.2)'"
                            :vector="vector"></Text_style>
            </template>

        </vector_layer>
        <feature_toolbar :show-close="true" @itemClick="toolbarClick" :items="toolbarItems" :width="{mobile:'45px',desktop:'180px'}"
                         :height="{mobile:'180px',desktop:'38px'}" @close="$emit('close',true)" :close-action="()=>{router.go(-1)}"></feature_toolbar>
    </div>
</template>

<script lang="ts">
    import {defineComponent, onMounted, ref} from "vue";
    import {default as map} from "ol/Map";
    import {default as vector_layer} from "@/components/openLayers/layers/Vector.vue";
    import {default as vector_source} from "@/components/openLayers/sources/vector/Vector.vue";
    import {default as snap} from "@/components/openLayers/interactions/snap/Snap.vue";
    import {SnapInterface} from "@/components/openLayers/interactions/snap/snap.interface"
    import {useStore} from "vuex";
    import {useToast} from "primevue/usetoast";
    import {VectorSourceInterface} from "@/components/openLayers/sources/vector/vectorSource.interface";
    import {default as feature_toolbar} from "@/components/common/featureToolbar/featureToolbar.vue";
    import {FTItemsInterface} from "@/components/common/featureToolbar/interface";
    import {default as Text_style} from "@/components/openLayers/textStyle/TextStyle.vue";
    import {default as draw_interaction} from "@/components/openLayers/interactions/draw/Draw.vue";
    import {DrawEvent, DrawType} from "@/components/openLayers/interactions/draw/model";
    import {useRouter} from "vue-router";


    export default defineComponent({
        name: "MeasurementComponent",
        components: {
            vector_layer,
            vector_source,
            snap,
            Text_style,
            feature_toolbar,
            draw_interaction
        },

        setup() {
            const store = useStore();
            const toast = useToast()
            const drawVectorSourceRef = ref<VectorSourceInterface>()
            const snapRef = ref<SnapInterface>()

            const router = useRouter()

            const activePlugin = ref<number>(0)
            return {
                store, toast, drawVectorSourceRef, snapRef,activePlugin,router
            }

        },

        props: {
            map: {
                required: true,
                type: map
            },
        },


        data() {
            return {
                toolbarItems: [
                    {
                        id: 1,
                        icon: '/icons/reset.png',
                        name: 'ریست',
                        disabled: false
                    },
                    {
                        id: 2,
                        icon: '/icons/snap.png',
                        name: 'اسنپ',
                        disabled: false
                    },
                    {
                        id: 3,
                        icon: '/icons/polygon.png',
                        name: 'مساحت',
                        disabled: false
                    },

                    {
                        id: 4,
                        icon: '/icons/lineString.png',
                        name: 'طول',
                        disabled: false
                    },
                ] as FTItemsInterface[],
                drawType :DrawType.LINESTRING
            };
        },

        methods: {
            toolbarClick(item:FTItemsInterface) {
                if(item.id === 2){
                    this.snapRef?.screenExtendSnap()
                }else if(item.id === 3){
                    if(this.activePlugin === 0){
                        this.drawType = DrawType.POLYGON
                        this.toolbarItems[3].disabled = true
                        this.activePlugin = 3
                        this.snapRef?.refreshSnap()
                    }else {
                        this.toolbarItems[3].disabled = false
                        this.activePlugin = 0
                    }

                }else if(item.id === 4){
                    if(this.activePlugin === 0){
                        this.drawType = DrawType.LINESTRING
                        this.toolbarItems[2].disabled = true
                        this.activePlugin = 4
                        this.snapRef?.refreshSnap()
                    }else {
                        this.toolbarItems[2].disabled = false
                        this.activePlugin = 0
                    }

                }else if(item.id === 1){
                    this.drawVectorSourceRef?.removeFeatures()
                    this.activePlugin = 0
                    this.toolbarItems.map((item)=>{
                        item.disabled = false
                    })

                }
            },

            async drawEvent(target: DrawEvent) {
                if (target.type === "drawend") {
                    console.log(target.feature)
                }

            },
        },



    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
