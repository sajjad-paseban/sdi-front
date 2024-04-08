<template>
    <div dir="ltr" :style="map_css" :id="id">
        <slot v-if="map" :map="map" name="view"></slot>
        <slot v-if="map" :map="map" name="tile"></slot>
        <slot name="default" v-if="map" :map="map"></slot>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, onMounted, Ref} from "vue";
    import Map from 'ol/Map.js';
    import {useStore} from "vuex";
    import {OpenLayerMutations} from "@/store/openLayer/mutations";

    export default defineComponent({
        name: "MapComponent",
        components: {},
        setup(props) {
            const map = ref<Map>() as Ref<Map>
            const store = useStore()

            onMounted(() => {
                map.value = new Map({
                    target: props.id
                })
                if (props.id === 'main_map')
                    store.commit(OpenLayerMutations.SET_MAP,map.value)
                else{
                    store.commit(OpenLayerMutations.SET_SUB_MAP,map.value)
                }

            })
            return {map,store}
        },
        props: {
            height: {
                required: false,
                type: String,
                default: '100dvh'
            },
            width: {
                required: false,
                type: String,
                default: '100dvw'
            },
            top: {
                required: false,
                type: String,
                default: '0'
            },
            bottom: {
                required: false,
                type: String,
                default: '0'
            },
            id:{
                required: false,
                type: String,
                default: 'main_map'
            }
        },
        computed: {
            map_css() {
                return {
                    "height": this.height,
                    "width": this.width,
                    "top": this.top,
                    "bottom": this.bottom,

                }
            }
        },
        data() {
            return {};
        },
        methods: {},
        watch: {},

        unmounted(): void {
            if (this.id === 'main_map')
                this.store.commit(OpenLayerMutations.SET_MAP,null)
            else
                this.store.commit(OpenLayerMutations.SET_SUB_MAP,null)
        }

    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
