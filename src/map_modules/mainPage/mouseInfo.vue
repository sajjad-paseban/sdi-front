<template>
    <v-slide-y-reverse-transition>
        <div ref="parent">
            <div ref="child" :style="fullScreen?'bottom:10px!important':''"
                 v-if="show&&(store.getters.getMap ||store.getters.getSubMap)"
                 class="ml-1 mosueInfo elevation-3 bg-themeBars pa-2 rounded-lg">
                <span class="">Zoom : {{ zoom }} &nbsp; | &nbsp; </span>
                <span style="cursor: pointer" @click="changeShowType">{{showType}}</span>
                &nbsp;
                <span v-if="showType === 'UTM'">Zone : {{ zone }}</span
                >&nbsp;&nbsp;&nbsp; <span>{{showType==='UTM'?'X':'lon'}} : {{ x }}</span
            >&nbsp;&nbsp;<span>{{showType==='UTM'?'Y':'lat'}} : {{ y }}</span>
            </div>
        </div>

    </v-slide-y-reverse-transition>
</template>

<script lang="ts">
    import {defineComponent, onMounted, onUnmounted, ref} from "vue";
    import {useStore} from "vuex";
    import Map from 'ol/Map.js';
    import {LatLon} from 'geodesy/mgrs.js';
    import {OpenLayerMutations} from "@/store/openLayer/mutations";

    export default defineComponent({
        name: "mouseInfo",
        components: {},
        setup(props) {
            const store = useStore()
            const zoom = ref<number | undefined>(0)
            const showType = ref<string>('UTM')
            const x = ref<string>()
            const y = ref<string>()
            const zone = ref<number>()
            const map = ref<Map>()

            const child = ref<HTMLElement>()
            const parent = ref<HTMLElement>()

            function moveend(){
                if (map.value){
                    zoom.value = map.value.getView().getZoom()
                    if (zoom.value)
                        zoom.value = parseInt(zoom.value.toFixed(1))
                }

            }

            function pointermove(evt:any){
                if (map.value){
                    let coord = evt.coordinate;


                    if (showType.value === 'UTM') {

                        //convert to utm//
                        const latLongP = new LatLon(coord[1], coord[0]);
                        const utmCoord = latLongP.toUtm();
                        //convert to utm//


                        x.value = utmCoord.easting.toFixed(8)
                        y.value = utmCoord.northing.toFixed(8)
                        zone.value = utmCoord.zone


                    } else {
                        x.value = coord[0].toFixed(8)
                        y.value = coord[1].toFixed(8)

                    }
                }

            }


            onMounted(() => {
                map.value = props.fullScreen ? store.getters.getSubMap : store.getters.getMap

                if (map.value){
                    map.value.on('moveend', moveend)

                    map.value.on('pointermove',pointermove)
                }
            })

            onUnmounted(()=>{
                if (map.value){
                    map.value.un('moveend', moveend)

                    map.value.un('pointermove',pointermove)
                }
            })

            return {store, zoom, x, y, zone, showType,parent,child}
        },
        data() {
            return {


                show: false
            };
        },
        methods: {
            changeShowType() {
                if (this.showType === 'UTM') {
                    this.showType = 'DD'
                } else {
                    this.showType = 'UTM'
                }
            },

            observeHeight() {
                const resizeObserver = new ResizeObserver( (e:ResizeObserverEntry[])=> {
                    if (this.child)
                    if (e[0].contentRect.width<500){
                        this.child.style.display = 'none'
                    }else {
                        this.child.style.display = 'block'
                    }

                });

                if (this.parent)
                    resizeObserver.observe(this.parent)
            }
        },
        watch: {
            zone() {
                if (this.zone) {
                    this.store.commit(OpenLayerMutations.SET_ZONE, this.zone)
                }
            }
        },
        props: {
            fullScreen: {
                type: Boolean,
                default: false
            },
        },

        mounted() {
            setTimeout(() => {
                this.show = true
            }, 3000)

            setTimeout(()=>{
                this.observeHeight()
            },3500)
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .mosueInfo {
        position: fixed;
        left: 2px;
        bottom: 50px;
        font-size: 9px;
        z-index: 100;
        font-family: "IRANSansWeb_UltraLight" !important;
        font-weight: bold;
    }

    @media only screen and (min-width: 1020px) {
        .mosueInfo {
            position: absolute;
            left: 2px;
            font-size: 11px;
        }
    }

    @media only screen and(max-width: 800px) {
        .mosueInfo {
            position: absolute;
            left: 2px;
            font-size: 5px;
        }
    }

    @media only screen and (max-width: 800px) {
        .mosueInfo {
            font-size: 8px;
        }
    }

    @media only screen and (max-width: 730px) {
        .mosueInfo {
            display: none;
        }
    }
</style>
