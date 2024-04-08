<template>
    <div style="height:100%;width:100%" class="pa-1">
        <div v-for="(item,index) in items_clone" style="width:100%;transition:  height .2s"
             :style="item.isOpen?`height:${elementHeight}px`:'height:40px'"
             class="rounded-lg elevation-3  border-t" :class="item.isOpen?'mt-2':'mt-2'">
            <v-row @click="openText(item,index)" class="ma-0 pa-0  rounded-t-lg " :class="item.isOpen?'bg-grey-lighten-2':''"
                   style="height:40px;cursor: pointer" align="center">
                <slot :item="item" name="title"></slot>
                <v-spacer></v-spacer>
                <v-icon v-if="!item.isOpen"  class="ml-3">mdi-chevron-double-down</v-icon>
                <v-icon v-else  class="ml-3">mdi-chevron-double-up</v-icon>
            </v-row>
            <v-slide-y-transition>
                <div v-show="item.isOpen" :id="`text-${index}`" style="width:100%" class="pa-2">

                    <slot :item="item" name="item"></slot>
                </div>
            </v-slide-y-transition>


        </div>


    </div>

</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, watch} from "vue";
import {useStore} from "vuex";
import {useToast} from "primevue/usetoast";


export default defineComponent({
    name: "ExpandPanelComponent",

    setup(props) {

        const store = useStore()
        const initData = ref(false)
        const toast = useToast()

        const items_clone = ref<any[]>([])

        onMounted(() => {
            props.items.map((item) => {
                items_clone.value.push({...item, isOpen: false})
            })
        })

        return {
            items_clone,
            initData,
            store,
            toast,
        }
    },
    data() {
        return {
            elementHeight: 50
        };
    },
    directives: {},

    props: {
        items: {
            type: Array as PropType<any[]>,
            required: true
        }
    },

    methods: {
        getHeight(index: number) {
            const element = document.getElementById(`text-${index}`)
            this.elementHeight = 50
            setTimeout(() => {
                this.elementHeight = this.elementHeight + element.offsetHeight
            }, 5)

        },
        openText(item: any, index: number) {
            this.items_clone.map((i) => {
                if (i.id !== item.id) {
                    i.isOpen = false
                }
            })
            item.isOpen = !item.isOpen
            this.getHeight(index)
        }
    },


});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
