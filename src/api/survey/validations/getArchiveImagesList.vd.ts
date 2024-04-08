import {z} from "zod";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";
import {apartmentFacilitiesValidator} from "@/api/survey/validations/apartmentFacilities.vd";
import {LayerTree} from "@/models/Layer.Interface";
import {ArchiveGroup} from "@/models/Survey.interface";

export const getArchiveImageValidator=z.object({
        id:z.number().optional(),
        name:z.string().nullable(),
        master:z.number(),
        subsystem:z.number(),
        group:z.number(),
        archive_type:z.number(),
        file_format:z.number().nullable(),
        document:z.number().nullable(),
        page:z.number().nullable(),
        insert_date:z.string().nullable(),
        update_date:z.string().nullable(),
        delete_date:z.string().nullable(),
        user:z.number().nullable().optional(),
        delete:z.boolean(),
        panorama:z.boolean(),
        business:z.number().nullable(),
        business_unit:z.number().nullable(),
        arse:z.number().nullable(),
        building:z.number().nullable(),
        apartment:z.number().nullable(),
        version:z.number().nullable(),
        src:z.string().nullable(),
        thumb_src:z.string().nullable().optional(),
        description:z.string().nullable(),
        group_name:z.string().optional(),
})
export const getArchiveImagesListValidator = z.array(getArchiveImageValidator)