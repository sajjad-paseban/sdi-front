import {z} from "zod";
import {floorUsingArrayValidator} from "@/api/survey/validations/floorUsing.vd";
import {apartmentFacilitiesValidator} from "@/api/survey/validations/apartmentFacilities.vd";
import {LayerTree} from "@/models/Layer.Interface";
import {ArchiveGroup} from "@/models/Survey.interface";

export const addArchiveGroupValidator: z.ZodType<ArchiveGroup> = z.lazy(() =>
    z.object({
        id: z.number(),
        title: z.string(),
        value: z.number(),
        master: z.number().optional(),
        subsystem: z.number().optional(),
        group: z.number().optional(),
        children: z.array(addArchiveGroupValidator).optional(),
        image: z.string().optional()
    })
);

export const addArchiveGroupListValidator = z.array(addArchiveGroupValidator)