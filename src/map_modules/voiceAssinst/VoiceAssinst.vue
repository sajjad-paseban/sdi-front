<template>
    <div id="player">
        <v-btn color="active" :disabled="startBtn" @click="startRecord" id="btn-start-recording" icon
               class="elevation-4" size="small"
               style="position: fixed;left:30px;bottom:100px;z-index: 1001" v-tooltip.top="'شروع ضبط صدا'">
            <v-avatar size="22" class="">
                <v-img
                        class=""
                        src="@/assets/icons/start_record.png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>
        <v-btn class="elevation-4" color="active" :disabled="stopBtn" v-tooltip.top="'پایان ضبط صدا'" size="small"
               @click="stopRecord" id="btn-stop-recording" icon
               style="position: fixed;left:80px;bottom:100px;z-index: 1001">
            <v-avatar size="22" class="">
                <v-img
                        class=""
                        src="@/assets/icons/stop_record.png"
                        alt="John"
                ></v-img>
            </v-avatar>
        </v-btn>

    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {useStore} from "vuex";
import axios from "axios";

// import '@/map_modules/voiceAssinst/js.js'
export default defineComponent({
    name: "VoiceComponent",
    components: {},
    setup() {
        const store = useStore()
        return {
            store
        }
    },
    data() {
        return {
            mediaRecorder: null as any,
            stopBtn: true,
            startBtn: false
        };
    },
    props: {},
    emits:['searchVoice'],
    watch: {},
    methods: {
        startRecord() {
            this.startBtn = true
            this.stopBtn = false
            navigator.mediaDevices.getUserMedia({audio: true})
                .then(stream => {
                    this.mediaRecorder = new MediaRecorder(stream);
                    this.mediaRecorder.start();

                    const audioChunks = [];
                    this.mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    this.mediaRecorder.addEventListener("stop", async () => {
                        const audioBlob = new Blob(audioChunks, {
                            'type': 'audio/mp3'
                        });


                        const formData = new FormData();
                        formData.append('audio-file', audioBlob,'test.mp3');


                        const response = await axios({
                            method: "post",
                            url: 'http://localhost:8000/survey/upload_voice',
                            data:formData
                        })
                        if (response.data){
                            this.$toast.add({
                                group: 'tr',
                                life: 8000,
                                severity: 'success',
                                summary: ' نتیجه درخواست',
                                detail: response.data
                            });
                        }
                        console.log(response.data,'ssssssssssssssssssssssss')
                        this.$emit('searchVoice',response.data)

                        // const audioUrl = URL.createObjectURL(audioBlob);
                        // const link = document.createElement('a')
                        // link.href = audioUrl
                        // link.download = 'layer.wav'
                        // link.click()
                        // console.log(audioUrl)
                    });

                });
        },
        stopRecord() {
            this.mediaRecorder.stop();
            this.startBtn = false
            this.stopBtn = true
        }
    },

    mounted() {

    }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
