import {z} from "zod";
import {DarbInfo, ParkingAndStoreAndCommons, ParkingAndStoreAndCommons_name, Wall} from "@/models/Survey.interface";
import {storeArrayValidator} from "@/api/survey/validations/store.vd";
import {parkingValidator} from "@/api/survey/validations/parking.vd";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";

export const buildingFloorValidator = z.object({

    id:z.number().optional(),
    area:  z.number(),
    floor_height:z.number().optional(),
    progress_percent:z.number().nullable().optional(),
    floor_type:  z.number(),
    destruction_area:z.number().optional(),
    finish_year:z.number().optional().nullable(),
    units_number:  z.number(),

    progress_area:z.number().optional(),
    parking_store_commons:z.array(z.object({
        name:z.enum(['راهرو' , 'پارکینگ' , 'انباری']),
        value:parkingValidator.or(z.object({area:z.number()}))
    })),
    floor_using:floorUsingArrayValidator.optional()
})

export const buildingFloorsValidator = z.array(buildingFloorValidator)

