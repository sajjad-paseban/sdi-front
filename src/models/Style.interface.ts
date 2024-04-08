import {usersObject} from "@/models/User.interface";

export interface BaseStyleInterface {
    name: string
    geo_type?: string
    min_zoom: number | null
    max_zoom: number | null
    for_layer?:boolean
    id?:number
    layer_id?:number|null
    polygon: {
        color: string | null,
        pattern: string | null,
        pattern_color: string | null
    } | null
    edge: {
        color: string | null,
        pattern: string | null,
        width: number | null
    } | null
    point: {
        icon: string | null,
        size: number | null
    } | null
}

export interface LabelStyleInterface {
    id?:number
    for_layer?:boolean
    layer_id?:number|null

    for_layerField?:boolean
    layer_field_id?:number|null

    name: string
    min_zoom: number | null
    max_zoom: number | null

    font_family: string
    font_size: number
    font_style: string
    font_weight: string

    halo_fill: string
    halo_radius: number

    fill_color: string

    line_placement: boolean | null

    labels?:string[]

}

export interface FileSld {
    name:string
    file:File
    layer_id:number
    id?:number
}


export interface ListStyles {
    id: number
    name: string
    legend: string | null
    user:string|null
    geo_type:string
    style_type:string
}

export interface StylePattern {
    name: string
    legend: string
}

export interface SaveStyle {
    id: number

}

export interface AdvanceStyle {
    id?:number
    prop:number
    rules:{
        style:any
        filter_type:string|null
        conditions:{
            operator:string|null
            value:string|null
        }[]
    }[]

}