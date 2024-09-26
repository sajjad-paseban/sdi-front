<template>
    <v-list id="toolBtn" class="right_menu" width="100" color="rgba(57,68,87,0)" show
            :style="fullScreen?'bottom:10px!important':''">
        <!-- <v-scale-transition>
            <v-btn
                    v-if="show"
                    @click="click('map')"
                    icon
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
            >
                <v-avatar size="25" class="mx-2">
                    <v-img src="@/assets/icons/baseMap.png" alt="John"></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition> -->

        <!-- <v-scale-transition>
            <v-btn
                    v-if="show"
                    @click="click('layers')"
                    icon
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
            >
                <v-avatar size="25" class="mx-2">
                    <v-img src="@/assets/icons/layer.png" alt="John"></v-img>
                </v-avatar>
            </v-btn>
        </v-scale-transition> -->

        <!--        <v-scale-transition>-->
        <!--            <v-btn-->
        <!--                    active-class="no-active"-->
        <!--                    v-if="show"-->
        <!--                    link-->
        <!--                    icon-->
        <!--                    bottom-->
        <!--                    right-->
        <!--                    size="small"-->
        <!--                    class="my-1 mr-3"-->
        <!--                    @click="graticuleClick"-->
        <!--            >-->
        <!--                <div class=" rounded-lg">-->
        <!--                    <v-avatar size="25" class="mx-2">-->
        <!--                        <v-img src="@/assets/icons/gratical.png" alt="John"></v-img>-->
        <!--                    </v-avatar>-->
        <!--                </div>-->
        <!--            </v-btn>-->
        <!--        </v-scale-transition>-->
        <!--        <v-scale-transition>-->
        <!--            <v-btn-->
        <!--                    active-class="no-active"-->
        <!--                    v-if="show"-->
        <!--                    link-->
        <!--                    icon-->
        <!--                    bottom-->
        <!--                    right-->
        <!--                    size="small"-->
        <!--                    class="my-1 mr-3"-->
        <!--            >-->
        <!--                <div class=" rounded-lg">-->
        <!--                    <v-avatar size="25" class="mx-2">-->
        <!--                        <v-img src="@/assets/icons/gps.png" alt="John"></v-img>-->
        <!--                    </v-avatar>-->
        <!--                </div>-->
        <!--            </v-btn>-->
        <!--        </v-scale-transition>-->

        <!-- <v-scale-transition>
            <v-btn
                    active-class="no-active"
                    v-if="show&&(page ||(!page&&!fullScreen))"
                    link
                    icon
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
                    @click="fullScreenClick"
            >
                <div class=" rounded-lg">
                    <v-avatar size="25" class="mx-2">
                        <v-img src="@/assets/icons/fullscreen.png" alt="John"></v-img>
                    </v-avatar>
                </div>
            </v-btn>
        </v-scale-transition> -->

        <!-- <v-scale-transition>
            <v-btn
                    active-class="no-active"
                    v-if="measureRouteName&&show&&(page ||(!page&&!fullScreen))"
                    @click="router.push({name:measureRouteName})"
                    link
                    icon
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
            >
                <div class=" rounded-lg">
                    <v-avatar size="25" class="mx-2">
                        <v-img src="@/assets/icons/mesure.png" alt="John"></v-img>
                    </v-avatar>
                </div>
            </v-btn>
        </v-scale-transition> -->

        <!-- <v-scale-transition>
            <v-btn
                    active-class="no-active"
                    v-if="show&&!fullScreen"
                    link
                    @click="router.push({name:'info'})"
                    icon
                    bottom
                    right
                    size="small"
                    class="my-1 mr-3"
            >
                <div class=" rounded-lg">
                    <v-avatar size="25" class="mx-2">
                        <v-img src="@/assets/icons/info.png" alt="John"></v-img>
                    </v-avatar>
                </div>
            </v-btn>
        </v-scale-transition> -->

        <!-- <v-scale-transition>
            <v-btn
                    active-class="no-active"
                    v-if="show&&(page ||(!page&&!fullScreen))"
                    link
                    icon
                    bottom
                    @click="homeClick"
                    right
                    size="small"
                    class="my-1 mr-3"
            >
                <div class=" rounded-lg">
                    <v-avatar size="25" class="mx-2">
                        <v-img src="@/assets/icons/home.png" alt="John"></v-img>
                    </v-avatar>
                </div>
            </v-btn>
        </v-scale-transition> -->
    </v-list>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import {useStore} from "vuex";
import {useRoute, useRouter} from "vue-router";
import Map from "ol/Map";

export default defineComponent({
    name: "ToolMenu",
    components: {},
    setup() {
        const store = useStore()
        const router = useRouter()
        const route = useRoute()

        const measureRouteName = ref<string | null>(null)
        const homeRouteName = ref('')

        onMounted(() => {
            homeRouteName.value = String(route.name)
            if (route.name == 'home') {
                measureRouteName.value = 'measurement'
            } else if (route.name == 'mainPage') {
                measureRouteName.value = 'pageMeasurement'
            } else if (route.name == 'survey') {
                measureRouteName.value = 'surveyMeasurement'
            }
        })

        return {
            store, router, measureRouteName, homeRouteName
        }
    },
    props: {
        fullScreen: {
            type: Boolean,
            default: false
        },
        page: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            show: false
        };
    },
    methods: {
        click: function (i: string) {
            setTimeout(() => {
                this.$emit('toolBtnHandle', i)
            }, 200)
        },

        graticuleClick() {
            this.$router.push({name: 'graticule'})
        },

        fullScreenClick() {
            const element = window.document.getElementById('app')
            if (element?.requestFullscreen) {
                element.requestFullscreen();
            }
        },

        flyTo(location,zoom, done) {
            const duration = 5000;

            let map: Map | null = null
            if (this.fullScreen) {
                map = this.store.getters.getSubMap
            } else {
                map = this.store.getters.getMap
            }
            const view = map.getView()

            let parts = 2;
            let called = false;

            function callback(complete) {
                --parts;
                if (called) {
                    return;
                }
                if (parts === 0 || !complete) {
                    called = true;
                    done(complete);
                }
            }

            view.animate(
                {
                    center: location,
                    duration: duration,
                },
                callback
            );
            view.animate(
                {
                    zoom: zoom - 3,
                    duration: duration / 2,
                },
                {
                    zoom: zoom,
                    duration: duration / 2,
                },
                callback
            );
        },

        homeClick() {
            this.router.push({name: this.homeRouteName})

            let map: Map | null = null
            if (this.fullScreen) {
                map = this.store.getters.getSubMap
            } else {
                map = this.store.getters.getMap
            }
            // this.flyTo(this.store.getters.getMapConfig.center,this.store.getters.getMapConfig.currentZoom,()=>{})
            map.getView().animate({zoom: this.store.getters.getMapConfig.currentZoom}, {center: this.store.getters.getMapConfig.center}, {duration: 2000});


        }
    },
    watch: {},
    mounted(): void {
        setTimeout(() => {
            this.show = true
        }, 2000)
    }

});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn--active.no-active::before {
    opacity: 0 !important;
}

.right_menu {
    position: absolute;
    right: 10px;
    bottom: 40px;
    z-index: 101;
    overflow-y: hidden !important;
    background-color: #faebd700;

}
</style>
