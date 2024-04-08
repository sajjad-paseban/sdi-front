import {RolesWithParentName} from "@/models/Role.interface";
import {BaseMapInterface} from "@/models/BaseMap.interface";

export enum ShowLayersType {
    TILE = 'Tile',
    IMAGE = 'Image'
}

export interface MapConfigInterface {
    role: number|null
    baseMap: number|null
    showLayersType: ShowLayersType
    centerPointX: number
    centerPointY: number
    extendTopX: number
    extendTopY: number
    extendBottomX: number
    extendBottomY: number,
    max_zoom: number,
    min_zoom: number,
    current_zoom: number,
    id?:number,
}

export interface GetMapConfigInterface {
    role: RolesWithParentName
    baseMap: BaseMapInterface
    showLayersType: ShowLayersType
    centerPointX: number
    centerPointY: number
    extendTopX: number
    extendTopY: number
    extendBottomX: number
    extendBottomY: number,
    max_zoom: number,
    min_zoom: number,
    current_zoom: number,
    id?:number,
}

export interface MassageMapConfig{
    massage:string
}