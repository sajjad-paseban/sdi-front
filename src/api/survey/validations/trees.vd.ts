import {z} from "zod";
import {DarbInfo, Wall} from "@/models/Survey.interface";

export const treeValidator = z.object({


    tree_type: z.number().nullable(),
    tree_number: z.number(),
    cut_down_numbers: z.number(),
    planting_year: z.number().nullable(),
    allowed_cut_down_number:z.number().nullable(),
    relation_id:z.number().optional().nullable(),
})


export const treesValidator =z.array(treeValidator)