<template>

        <v-overlay id="confirmDialog" persistent contained v-model="show" z-index="10000002" style="z-index: 100000003">
            <v-scroll-y-transition>


                <v-card dir="rtl" v-if="dialog"  :width="mobileLayout?'80vw':'20vw'" class="rounded-lg font-weight-bold"
                        style="position: fixed;z-index: 1010;top: 30px;" :style="mobileLayout?'left:10vw':'left:40vw'">
                    <v-card-title class="pa-0 ma-0">
                        <v-row class="ma-0 pa-0 mr-1">
                            <p v-if="topic" class="pa-1 pr-2" style="font-size: 12px;font-weight: bold">{{topic}}</p>

                        </v-row>

                    </v-card-title>
                    <v-card-text class="pa-0 ma-0 mr-2">
                        <v-row class="pa-0 ma-0 ">

                            <v-icon class="mt-1" color="red-lighten-2">
                                mdi-information-outline
                            </v-icon>
                            <p class="pa-1 pr-2 font-weight-bold" style="font-size: 12px">{{massage}}</p>
                        </v-row>

                    </v-card-text>
                    <v-card-actions class="pa-0 ma-0">
                        <v-row class="ma-0 pa-0 mr-2">
                            <v-btn class="font-weight-bold" @click="rejectBtn" :color="noBtn.color" variant="text" size="small">
                                {{noBtn.text}}
                            </v-btn>
                            <v-btn class="font-weight-bold" @click="acceptBtn" :color="yesBtn.color" variant="tonal" size="small">
                                {{yesBtn.text}}
                            </v-btn>
                        </v-row>
                    </v-card-actions>

                </v-card>


            </v-scroll-y-transition>
        </v-overlay>


</template>

<script lang="ts">
    import {useStore} from "vuex";
    import {defineComponent, PropType} from "vue";

    export default defineComponent({
        name: "confirmDialogComponent",
        setup(){
            const store = useStore()
            return{
                store
            }
        },



        props:{
            active:{
                type:Boolean,
                default:false,
            },
            massage:{
                type:String,
                default: ''
            },
            topic:{
                type:String,
                default: ''
            },
            accept:{
                type:Function,
                default:()=>{console.log('accept')}
            },
            reject:{
                type:Function,
                default:()=>{console.log('reject')}
            },
            yesBtn:{
                type:Object as PropType<{color:string,text:string}>,
                default : {
                    color:'primary',
                    text:'بله'
                }
            },

            noBtn:{
                type:Object as PropType<{color:string,text:string}>,
                default : {
                    color:'primary',
                    text:'خیر'
                }
            },
        },
        data() {
            return {

                dialog:false,
                show:false,

                mobileLayout: false,
            }
        },
        methods:{
            acceptBtn(){
                this.accept()
                this.show = false
                setTimeout(()=>{
                    this.store.commit('setConfirmDialog',{
                        massage: null,
                        topic: null,
                        accept: ()=>{console.log('accept')},
                        reject:  ()=>{console.log('reject')},
                        active: false
                    })
                },500)

            },
            rejectBtn(){
                this.reject()
                this.show = false
                setTimeout(()=>{
                    this.store.commit('setConfirmDialog',{
                        massage: null,
                        topic: null,
                        accept: ()=>{console.log('accept')},
                        reject:  ()=>{console.log('reject')},
                        active: false
                    })
                },500)
            },

            screenResizeHandler() {

                let x:any = document.getElementById("app");
                const height = parseInt(x.offsetWidth);
                this.mobileLayout = height < 700;

            },
        },
        created() {
            window.addEventListener("resize", this.screenResizeHandler);
        },
        unmounted() {
            window.removeEventListener("resize", this.screenResizeHandler);
        },
        watch:{
            active(){
                this.show = this.active


            },
            show(){
                setTimeout(()=>{
                    this.dialog = this.show

                },200)
            }
        },

        mounted(): void {
            this.screenResizeHandler()
        },

    });
</script>

<style scoped>

</style>