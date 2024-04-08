<template>
    <div
            @scroll.passive="fixedHeader()"
            class="rounded-lg elevation-2 editTable"
            style="width: 100%; height: 100%"
    >
        <v-table
                ref="table"
                id="table"
                fixed-header
                density="compact"
                :height="items.length>perPage?String(parseFloat(height)-40):String(parseFloat(height))"
                style="overflow: auto"
        >
            <thead>
            <tr ref="header" style="">
                <th
                        style="width: 5%; background-color: #f3f3f3;height: 30px"
                        v-if="checkBox"
                        class="text-right font-weight-bold"
                >
                    select
                    <v-slide-y-transition>
                        <v-checkbox-btn
                                v-if="filterActivate"
                                style="margin-top: -3px"
                                density="compact"
                                v-model="selectAll"
                        ></v-checkbox-btn>
                    </v-slide-y-transition>
                </th>
                <th
                        class="text-right font-weight-bold"
                        @mouseover="activeSortIcon = index"
                        @mouseout="activeSortIcon = -1"
                        v-for="(i, index) in head"
                        :key="i.text"
                        :style="
              'width: ' +
              i.width +
              '; white-space: nowrap;background-color: #f3f3f3;;height: 30px'
            "
                >
                    {{ i.text }}
                    <v-icon @click="sortItems(i, index)" v-show="i.sortType === 'ASC'"
                    >mdi-arrow-down
                    </v-icon
                    >
                    <v-icon @click="sortItems(i, index)" v-show="i.sortType === 'DES'"
                    >mdi-arrow-up
                    </v-icon
                    >
                    <v-slide-y-transition>
                        <v-text-field
                                v-if="filterActivate"
                                v-model="i.filterText"
                                density="compact"
                                variant="outlined"
                                class="rounded-lg mb-1"
                                @update:modelValue="filterHandler(i, index)"
                        ></v-text-field>
                    </v-slide-y-transition>
                </th>
                <th
                        style="width: 20%; background-color: #f3f3f3;height: 30px"
                        v-if="action"
                        class="text-right font-weight-bold"
                >
                    عملیات
                </th>
            </tr>
            </thead>
            <tbody>
            <tr
                    style="white-space: nowrap;cursor: pointer"
                    class="myEditInput myForm"
                    :class="activeItem === item?'bg-primary_active':''"
                    @click="itemClick(item)"
                    v-for="(item, index) in paginated"
                    :key="index"
            >
                <td v-if="checkBox">
                    <v-checkbox-btn
                            style="margin-top: -3px"
                            density="compact"
                            v-model="item.checkBox"
                    ></v-checkbox-btn>
                </td>
                <template v-if="item.editMode === true">
                    <template v-for="i in headers" :key="i.text">
                        <template v-for="(itemObject, keyObject) in item" :key="keyObject">
                            <td v-if="i.value === String(keyObject)" class="text-center">
                                <template v-if="!i.type">
                                    <v-text-field
                                            density="compact"
                                            variant="solo"
                                            :type="
                        typeof item[keyObject] == 'string' ? 'text' : 'number'
                      "
                                            v-model="item[keyObject]"
                                    ></v-text-field>
                                </template>
                                <template v-else>
                                    <v-text-field
                                            v-if="i.type === 'STRING'"
                                            density="compact"
                                            variant="solo"
                                            type="text"
                                            v-model="item[keyObject]"
                                    ></v-text-field>

                                    <v-text-field
                                            v-if="i.type === 'NUMBER'"
                                            density="compact"
                                            variant="solo"
                                            type="number"
                                            v-model="item[keyObject]"
                                    ></v-text-field>

                                    <v-select
                                            v-if="i.type === 'LIST'"
                                            style="width: 100%"
                                            v-model="itemObject.value"
                                            variant="solo"
                                            :items="itemObject.list"
                                            item-title="text"
                                            item-value="value"
                                            density="compact"
                                    ></v-select>

                                    <v-checkbox-btn
                                            v-if="i.type === 'RADIO'"
                                            style="margin-top: -3px"
                                            density="compact"
                                            v-model="item[keyObject]"
                                            @update:modelValue="radioChange(item, String(keyObject))"
                                    ></v-checkbox-btn>


                                    <v-checkbox-btn
                                            v-if="i.type === 'BOOLIAN'"
                                            style="margin-top: -3px"
                                            density="compact"
                                            v-model="item[keyObject]"

                                    ></v-checkbox-btn>
                                </template>
                            </td>
                        </template>
                    </template>
                </template>
                <template v-else>
                    <template v-for="i in headers" :key="i.text">
                        <template v-for="(itemObject, key) in item" :key="key">
                            <td  v-tooltip.bottom="typeof itemObject === 'string'?String(itemObject):''"  style="font-weight: bold" v-if="i.value === String(key)">

                                <template v-if="!i.type || i.type !== 'LIST'">

                                    <template v-if="typeof itemObject === 'boolean'">
                                        <template v-if="itemObject">
                                            <p style="color:rgb(var(--v-theme-success))"> فعال</p>
                                        </template>
                                        <template v-else>
                                            <p style="color:rgb(var(--v-theme-error))"> غیر فعال</p>
                                        </template>
                                    </template>
                                    <template v-else-if="i.type && i.type === 'IMAGE'">
                                        <v-img

                                                class="rounded-lg  ml-8"
                                                :src="itemObject"
                                                width="20"
                                                height="20"
                                        />
                                    </template>
                                    <template v-else>
                                        {{ itemObject?itemObject:'خالی' }}
                                    </template>

                                </template>
                                <template v-else>
                                    {{ itemObject.value }}
                                </template>
                            </td>
                        </template>
                    </template>
                </template>

                <td v-if="action" style="">
                    <template v-if="item.editMode">
                        <v-btn
                                class="ma-0 pa-0"
                                size="small"
                                color="success"
                                variant="plain"
                                @click="saveEdit(item, index)"
                        >
                            <v-icon size="x-large">mdi-checkbox-marked</v-icon>
                        </v-btn>
                        <v-btn
                                class="ma-0 pa-0"
                                size="small"
                                color="error"
                                variant="plain"
                                @click="cancelEdit(item, index)"
                        >
                            <v-icon size="x-large">mdi-close-box</v-icon>
                        </v-btn>
                    </template>
                    <template v-else>
                        <v-btn
                                class="ma-0 pa-0"
                                @click="$emit('actionClick', i.text, item, edit)"
                                v-for="i in action"
                                :key="i.text"
                                size="small"
                                :color="i.color"
                                variant="plain"
                        >
                            <v-tooltip activator="parent" location="bottom">{{
                                i.text
                                }}
                            </v-tooltip>
                            <v-icon size="large">{{ i.icon }}</v-icon>
                        </v-btn>
                    </template>
                </td>
            </tr>
            </tbody>
        </v-table>
        <v-row v-if="items.length>perPage" dir="ltr" class="pa-0 ma-0  " style="background-color: #dadada;height: 38px">

            <v-col class="pa-0 ma-0 pt-1 ">

                <Paginator v-model:first="page" @page="onPage($event)" :rows="perPage"
                           :totalRecords="sorted.length"></Paginator>


            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {defineComponent, PropType} from "vue";
    import {useToast} from "primevue/usetoast";
    import {useStore} from "vuex";
    import Paginator from 'primevue/paginator';

    interface Headers {
        text: string;
        value: string;
        width?: string;
        sortType?: string;
        filterText?: string;
        type?: TableValuesTypes;
    }

    export enum TableValuesTypes {
        list = "LIST",
        string = "STRING",
        bool = "BOOLIAN",
        number = "NUMBER",
        radio = "RADIO",
        image = "IMAGE"
    }

    interface Items {
        [key: string]: any;
    }

    export default defineComponent({
        name: "editableTableComponent",
        components: {Paginator},

        setup() {
            const store = useStore()
            const toast = useToast()

            return {
                store, toast
            }
        },

        props: {

            saveEditItemCallback: {
                type: Function,
                required: false,
            },

            cancelEditItemCallback: {
                type: Function,
                required: false,
            },

            headers: {
                type: Array as PropType<Headers[]>,
                required: true,
            },
            items: {
                type: Array as PropType<Items[]>,
                required: true,
            },

            action: {
                type: Array as PropType<{ text: string; icon: string; color: string }[]>,
            },

            filterActivate: {
                type: Boolean,
                required: false,
                default: false,
            },

            editMode: {
                type: Boolean,
                required: false,
                default: false,
            },
            checkBox: {
                type: Boolean,
                required: false,
                default: false,
            },

            height: {
                type: String,
                required: false,
                default: "100%",
            },

        },

        data() {
            return {
                perPage: 20,
                page: 0,

                sorted: [] as any[],
                paginated: [] as any[],
                edit: [] as any[],

                selectArray: [] as any[],
                selectAll: false,

                head: [] as Headers[],

                activeSortIcon: 0,

                activeItem:null,
            };
        },

        methods: {
            sortItems(val: Headers, index: number) {
                // console.log(val, index);
                if (val.sortType == "ASC") {
                    val.sortType = "DES";
                    this.sorted.sort((a: any, b: any) => {
                        // console.log(typeof a[val.value]);
                        if (typeof a[val.value] == "string") {
                            const nameA = a[val.value].toUpperCase(); // ignore upper and lowercase
                            const nameB = b[val.value].toUpperCase(); // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        } else if (typeof a[val.value] == "number") {
                            return a[val.value] - b[val.value];
                        } else {
                            return 0;
                        }
                    });
                } else {
                    val.sortType = "ASC";

                    this.sorted.sort((a: any, b: any) => {
                        if (typeof a[val.value] == "string") {
                            const nameA = a[val.value].toUpperCase(); // ignore upper and lowercase
                            const nameB = b[val.value].toUpperCase(); // ignore upper and lowercase
                            if (nameA > nameB) {
                                return -1;
                            }
                            if (nameA < nameB) {
                                return 1;
                            }

                            // names must be equal
                            return 0;
                        } else if (typeof a[val.value] == "number") {
                            return b[val.value] - a[val.value];
                        } else {
                            return 0;
                        }
                    });
                }
                this.head[index] = val;
                this.paginated = this.sorted.slice(0, this.perPage)
                this.page = 0
            },

            saveEdit(item: any, index: number) {
                this.store.commit('setConfirmDialog', {
                    massage: 'آیا ویرایش مورد تایید است ؟',
                    topic: 'اخطار',
                    accept: async () => {
                        if (this.saveEditItemCallback) {


                            const res = await this.saveEditItemCallback({
                                item: this.edit[index],
                                newItem: item,
                                index: index
                            })
                            if (res) {
                                this.edit = this.sorted.map((v) => ({...v}));
                                this.toast.add({
                                    group: 'tr',
                                    life: 3000,
                                    severity: 'success',
                                    summary: ' نتیجه ویرایش',
                                    detail: "ویرایش موفقیت آمیز بود."
                                });
                                this.sorted[index].editMode = false;
                                this.paginated[index].editMode = false;
                            } else {
                                this.sorted = this.edit.map((v) => ({...v}))
                                this.toast.add({
                                    group: 'br',
                                    life: 3000,
                                    severity: 'error',
                                    summary: ' نتیجه ویرایش',
                                    detail: "ویرایش موفقیت آمیز نبود."
                                });

                            }
                        }else {
                            this.sorted[index].editMode = false;
                            this.paginated[index].editMode = false;
                        }


                    },
                    reject: async () => {
                        console.log('reject')

                        this.edit[index].editMode = false;
                        this.sorted[index] = this.edit[index];
                        this.paginated[index] = {...this.edit[index]};
                        if (this.cancelEditItemCallback) {
                            await this.cancelEditItemCallback({
                                item: this.edit[index],
                                newItem: item,
                                index: index
                            })
                        }

                    },
                    active: true
                })


            },

            async cancelEdit(item: any, index: number) {

                this.edit[index].editMode = false;
                this.sorted[index] = this.edit[index];
                this.paginated[index] = {...this.edit[index]};

                if (this.cancelEditItemCallback) {
                    await this.cancelEditItemCallback({
                        item: {...item, editMode: false},

                        index: index
                    })
                }
            },

            filterHandler(headerItem: any, index: number) {
                if (!headerItem.filterText) {
                    this.sorted = this.edit;
                } else {
                    this.sorted = this.edit.filter((item) => {
                        if (typeof item[headerItem.value] === "string") {
                            return item[headerItem.value].includes(headerItem.filterText);
                        } else {
                            return item[headerItem.value] == headerItem.filterText;
                        }
                    });
                }
            },

            getSelected() {

                let selected = this.sorted.filter((item: any) => {
                    return !!item.checkBox;
                })
                console.log(selected)
                return selected

            },

            fixedHeader() {
                console.log(this.$refs.header);
            },

            radioChange(item: Items, key: string) {
                this.sorted.forEach((i) => {
                    if (item !== i) {
                        i[key] = false;
                    }
                });
                this.edit = this.sorted.map((v) => ({...v}));
            },

            onPage(event: { page: number, first: number, pageCount: number, rows: number }) {
                this.paginated = this.sorted.slice(event.first, (event.first + this.perPage))
            },

            itemClick(item:any){
                this.$emit('itemClick',item)
                this.activeItem = item
            }
        },
        watch: {
            items() {
                this.sorted = this.items.map((v: any) => {
                    if (v.editMode != null) {
                        return {...v};
                    } else {
                        return {...v, editMode: this.editMode};
                    }
                });
                this.edit = this.sorted.map((v) => ({...v}));


            },

            sorted() {
                this.paginated = [...this.sorted.slice(0, this.perPage)]
            },

            filterActivate() {
                if (!this.filterActivate) {
                    this.sorted = this.edit;
                }
            },

            selectAll() {
                if (this.selectAll) {
                    this.sorted = this.items.map((v) => ({...v, checkBox: true}));
                    this.edit = this.sorted.map((v) => ({...v}));
                } else {
                    this.sorted = this.items.map((v) => ({...v, checkBox: false}));
                    this.edit = this.sorted.map((v) => ({...v}));
                }
            },
        },

        mounted() {
            if (this.checkBox) {
                this.sorted = this.items.map((v: any) => {
                    if (v.editMode != null) {
                        return {...v, checkBox: false};
                    } else {
                        return {...v, editMode: this.editMode, checkBox: false};
                    }
                });
            } else {
                this.sorted = this.items.map((v: any) => {
                    if (v.editMode != null) {
                        return {...v};
                    } else {
                        return {...v, editMode: this.editMode};
                    }
                });
            }

            this.edit = this.sorted.map((v) => ({...v}));
            this.head = this.headers.map((v) => ({
                ...v,
                sortType: "ASC",
                filterText: "",
            }));
        },
    });
</script>

<style >
    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > td {
        font-size: 10px !important;
    }

    .v-table > .v-table__wrapper > table > tbody > tr > td,
    .v-table > .v-table__wrapper > table > tbody > tr > th,
    .v-table > .v-table__wrapper > table > thead > tr > td,
    .v-table > .v-table__wrapper > table > thead > tr > th,
    .v-table > .v-table__wrapper > table > tfoot > tr > td,
    .v-table > .v-table__wrapper > table > tfoot > tr > th {
        padding: 3px 8px !important;
    }

    .editTable .v-btn--size-small {
        /* --v-btn-size: 0.75rem; */
        /* --v-btn-height: 28px; */

        min-width: 20px !important;
    }

    .editTable .v-field__field {
        font-weight: 600;
    }

    .editTable .v-input--density-compact {
        --v-input-padding-top: 0px !important;
    }

    .editTable .v-field {
        font-size: 8px !important;
        width: 80% !important;
    }

    .editTable .v-input--density-compact .v-field--variant-solo,
    .v-input--density-compact .v-field--variant-filled {
        --v-input-control-height: 20px !important;
        --v-field-padding-bottom: -2px !important;
    }

    .editTable .v-input--density-compact .v-field--variant-outlined,
    .v-input--density-compact .v-field--variant-filled {
        --v-input-control-height: 20px !important;
        --v-field-padding-bottom: -2px !important;
    }

    .editTable .v-text-field .v-input__details {
        display: none;
    }

    .editTable .v-field {
        --v-field-padding-start: 7px !important;
        --v-field-padding-end: 7px !important;
    }

    .editTable th {
        font-size: 8px !important;
        height: 20px;
    }

    .v-table--density-compact > .v-table__wrapper > table > tbody > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > thead > tr > td,
    .v-table--density-compact > .v-table__wrapper > table > tfoot > tr > td {
        height: 21px !important;
    }


    /*//------------prime------------------//*/
    .p-paginator {
        background: #ffffff;
        color: #6c757d;
        border: solid #e9ecef;
        border-width: 0;
        padding: 2px !important;
        border-radius: 0px;
    }

    .p-paginator .p-paginator-pages .p-paginator-page {
        background-color: transparent;
        border: 0 none;
        color: #6c757d;
        min-width: 2.357rem;
        height: 25px !important;
        font-size: 11px !important;
        margin: 0.143rem;
        transition: box-shadow 0.2s;
        border-radius: 3px;
    }

    .p-paginator .p-paginator-first, .p-paginator .p-paginator-prev, .p-paginator .p-paginator-next, .p-paginator .p-paginator-last {

        height: 25px !important;

    }

    /*//------------prime------------------//*/
</style>
