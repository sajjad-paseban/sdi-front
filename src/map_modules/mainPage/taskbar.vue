<template>
    <v-app-bar
            class="myTaskbarClass border elevation-8"
            style="
      border-top-right-radius: 0.475rem !important;
      border-top-left-radius: 0.475rem !important;z-index: 10002!important;bottom: 1px!important;overflow-x: auto"
            color="themeBars"
            location="bottom"
    >
        <layer-active-name></layer-active-name>
        <v-spacer></v-spacer>
<!--        <v-btn-->

<!--                class="rounded-lg"-->
<!--                size="small"-->
<!--                :class="{ taskbarActive: currentRoute === 'info' }"-->
<!--        >-->
<!--            <v-tooltip activator="parent" location="top">اطلاعات</v-tooltip>-->
<!--            <v-avatar size="27" class="">-->
<!--                <v-img src="@/assets/icons/locationInfo.png" alt="John"></v-img>-->
<!--            </v-avatar>-->
<!--        </v-btn>-->
<!--        <v-btn-->

<!--                class="rounded-lg"-->
<!--                size="small"-->
<!--                :class="{ taskbarActive: currentRoute === 'info' }"-->
<!--        >-->
<!--            <v-tooltip activator="parent" location="top">نشان ها</v-tooltip>-->
<!--            <v-avatar size="27" class="">-->
<!--                <v-img src="@/assets/icons/pin.png" alt="John"></v-img>-->
<!--            </v-avatar>-->
<!--        </v-btn>-->
        <v-btn

                class="rounded-lg"
                size="small"
                @click="panoramaClick"
        >
            <v-tooltip activator="parent" location="top"> پانوروما</v-tooltip>
            <v-avatar size="27" class="">
                <v-img src="@/assets/icons/panorama.png" alt="John"></v-img>
            </v-avatar>
        </v-btn>
        <v-btn
                @click="threeDClick"
                class="rounded-lg"
                size="small"
        >
            <v-tooltip activator="parent" location="top">سه بعدی</v-tooltip>
            <v-avatar size="27" class="">
                <v-img src="@/assets/icons/3d.png" alt="John"></v-img>
            </v-avatar>
        </v-btn>

      <v-btn
          @click="goToPlugin('haffari')"
          class="rounded-lg"
          size="small"
          :class="{ taskbarActive: currentRoute === 'haffari' }"
      >
        <v-tooltip activator="parent" location="top">حفاری</v-tooltip>
        <v-avatar size="27" class="">
          <v-img
              class=""
              src="@/assets/icons/dig.png"
              alt="John"
          ></v-img>
        </v-avatar>
      </v-btn>

        <v-btn
                @click="goToPlugin('printList')"
                class="rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'print' }"
        >
            <v-tooltip activator="parent" location="top">قالب چاپی</v-tooltip>
            <v-avatar size="27" class="">
                <v-img
                        class=""
                        src="@/assets/icons/print.png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>

        <v-btn
                @click="goToPlugin('surveyPanel')"
                class=" rounded-lg"
                size="small"

        >
            <v-tooltip activator="parent" location="top">پنل ممیزی</v-tooltip>
            <v-avatar size="25" class="">
                <v-img src="@/assets/icons/survey.png" alt="John"></v-img>
            </v-avatar>
            <v-menu v-if="false" activator="parent"  location="top" offset="10px" >
                <v-list class="">
                    <v-list-item
                            v-for="(item, index) in surveyItems"
                            :key="index"
                            :value="index"
                            @click="goToPlugin(item.route)"
                    >
                        <template v-slot:prepend>
                            <v-avatar size="18" class="mr-n2 ml-n1">
                                <v-img :src="store.state.frontUrl+item.icon" alt="John"></v-img>
                            </v-avatar>
                        </template>
                        <v-list-item-title class=" font-weight-bold">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>

        <v-btn
                @click="goToPlugin('analyzeModelsList')"
                class="rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'analyze' }"
        >
            <v-tooltip activator="parent" location="top">آنالیز</v-tooltip>
            <v-avatar size="27" class="">
                <v-img
                        class=""
                        src="@/assets/icons/analyze.png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>

        <v-btn
                class=" rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'search' }"
        >

            <v-avatar size="25" class="">
                <v-img src="@/assets/icons/search2.png" alt="John"></v-img>
            </v-avatar>
            <v-menu activator="parent"  location="top" offset="10px" >
                <v-list class="">
                    <v-list-item
                            v-for="(item, index) in searchItems"
                            :key="index"
                            :value="index"
                            @click="goToPlugin(item.route)"
                    >
                        <template v-slot:prepend>
                            <v-avatar size="18" class="mr-n2 ml-2">
                                <v-img :src="store.state.frontUrl+item.icon" alt="John"></v-img>
                            </v-avatar>
                        </template>
                        <v-list-item-title class=" font-weight-bold">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn
                class=" rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'feature' }"
        >

            <v-avatar size="25" class="">
                <v-img src="@/assets/icons/feature.png" alt="John"></v-img>
            </v-avatar>
            <v-menu activator="parent"  location="top" offset="10px" >
                <v-list class="">
                    <v-list-item
                            v-for="(item, index) in featureItems"
                            :key="index"
                            :value="index"
                            @click="goToPlugin(item.route)"
                    >
                        <template v-slot:prepend>
                            <v-avatar size="18" class="mr-n2 ml-2">
                                <v-img :src="store.state.frontUrl+item.icon" alt="John"></v-img>
                            </v-avatar>
                        </template>

                        <v-list-item-title class="font-weight-bold">{{ item.title }}</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
        </v-btn>
        <v-btn
                @click="goToPlugin('setting')"
                class="rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'setting' }"
        >
            <v-tooltip activator="parent" location="top">تنظیمات کلی</v-tooltip>
            <v-avatar size="27" class="">
                <v-img
                        class=""
                        src="@/assets/icons/setting.png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>

        <v-btn
                @click="goToPlugin('layer')"
                class="rounded-lg"
                size="small"
                :class="{ taskbarActive: currentRoute === 'layer' }"
        >
            <v-tooltip activator="parent" location="top">تنظیمات لایه</v-tooltip>
            <v-avatar size="27" class="">
                <v-img src="@/assets/icons/layer.png" alt="John"></v-img>
            </v-avatar>
        </v-btn>



        <!-- <v-btn color="black" flat icon="mdi-map"></v-btn>
          <v-btn color="black" flat icon="mdi-layers"></v-btn>
          <v-btn color="black" flat icon="mdi-home"></v-btn>
          <v-btn color="black" flat icon="mdi-widgets"></v-btn>
          <v-btn color="black" flat icon="mdi-widgets"></v-btn> -->
        <v-spacer></v-spacer>

    </v-app-bar>
</template>

<script lang="ts">
    import {defineComponent} from "vue";
    import MouseInfo from "./mouseInfo.vue";
    import LayerActiveName from "./layerActiveName.vue";
    import {useStore} from "vuex";
    import {useRouter} from "vue-router";

    export default defineComponent({
        name: "TaskBar",
        components: { LayerActiveName},
        setup(){
            const store=useStore()
            const router = useRouter()
            return{
                store,router
            }
        },
        data() {
            return {
                currentRoute: "",

                featureItems: [
                    { title: 'اضافه کردن عارضه' ,icon:'/icons/add.png',route:'addFeature'},
                    { title: 'ویرایش عارضه ' ,icon:'/icons/edit2.png',route: 'editFeature'},
                    { title: 'حذف عارضه ' ,icon:'/icons/delete.png',route: 'deleteFeature'},
                ],
                searchItems: [
                    // { title: 'جستجو سریع' ,icon:'/icons/search2.png',route: 'SearchFast'},
                    { title: 'جستجو با ترسیم' ,icon:'/icons/search2.png',route:'searchDraw'},
                    { title: 'جستجو با اقلام توصیفی' ,icon:'/icons/search2.png',route: 'searchMetadata'},
                ],

                surveyItems: [
                    { title: 'ممیزی ملک جدید' ,icon:'/icons/add.png',route:'Arse'},
                    { title: 'ویرایش ممیزی ملک موجود' ,icon:'/icons/edit.png',route: 'selectMap'},
                    { title: 'پنل ممیزی' ,icon:'/icons/dashboard.png',route: 'surveyPanel'},
                ],
            };
        },
        props: {
            msg: String,
        },
        methods: {
            goToPlugin(routeName: string) {
                // this.$router.push({name: routeName});
                if(routeName=== 'Arse'||routeName==='selectMap'||routeName==='surveyPanel'||routeName==='haffari'){
                    const routeData = this.router.resolve({name: routeName});
                    window.open(routeData.href, '_blank');
                }else {
                    this.$router.push({name: routeName});
                }



                // if (this.$route.name == "home") {
                //   this.$router.push({ name: routeName });
                // } else {
                //   this.$router.push({ name: "home" });
                // }
            },

            threeDClick(){
                window.open("http://5.160.232.203:3380/map/myNew3d/");
            },

            panoramaClick(){
                window.open('https://map-1.kashan.ir/map/myNew3d/panorama/51.47349/33.97204/')
            }
        },

        watch: {
            $route(to, from) {
                this.currentRoute = to.path.split("/")[1];
                // console.log(this.currentRoute);
            },
        },
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
    .myTaskbarClass .v-toolbar__content {
        height: 40px !important;

    }

    .taskbarActive {
        background-color: #0000ff26 !important;
    }
</style>
