import { z } from "zod";
export const getArseInfoValidator = z.object({
    direction: z.number(),
    num: z.number(),
    long: z.number(),
    geo_line: z.any(),
    adjacent_type: z.number().nullable(),
    gozar_lat: z.number().nullable().optional(),
    maabar_feature_json: z.any().optional(),
    bar_long: z.number().nullable().optional(),
    front_area: z.number().nullable().optional(),
    maabar_code: z.string().nullable().optional(),
    maabar_lat: z.number().nullable().optional(),
    maabar_long: z.number().nullable().optional(),
    main_maabar: z.boolean().optional()
});
export const getArseInfoListValidator = z.array(getArseInfoValidator);
//# sourceMappingURL=getArseInfo.vd.js.map