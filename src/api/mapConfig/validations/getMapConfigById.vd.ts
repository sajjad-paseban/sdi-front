import {z} from "zod";
import {ShowLayersType} from "@/models/MapConfig.interface";
import {getBaseMapsObjectValidator} from "@/api/baseMap/validations/getBaseMaps.vd";
import {getRolesWithParentNameObjectValidator} from "@/api/roles/validations/getRolesWithParentName.vd";

export const getMapConfigByIdValidator = z.object({
    id:z.number(),
    role:getRolesWithParentNameObjectValidator,
    baseMap:getBaseMapsObjectValidator,
    centerPointX:z.number(),
    centerPointY:z.number(),
    extendTopX:z.number(),
    extendTopY:z.number(),
    extendBottomX:z.number(),
    extendBottomY:z.number(),
    max_zoom:z.number(),
    min_zoom:z.number(),
    current_zoom:z.number(),
    showLayersType:z.nativeEnum(ShowLayersType)


})