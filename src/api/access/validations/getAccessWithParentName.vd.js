import { z } from "zod";
import { API_TYPE } from "@/models/Access.interface";
export const getAccessWithParentNameValidator = z.array(z.object({
    f_name: z.string().min(1),
    e_name: z.string().min(1),
    api: z.string().nullable(),
    api_type: z.nativeEnum(API_TYPE).nullable(),
    is_active: z.boolean(),
    parent: z.object({
        id: z.number().min(0),
        f_name: z.string().min(1),
        e_name: z.string().min(1),
        api: z.string().nullable(),
        api_type: z.nativeEnum(API_TYPE).nullable(),
        is_active: z.boolean(),
        parent: z.number().nullable(),
    }).nullable(),
}));
//# sourceMappingURL=getAccessWithParentName.vd.js.map