import { z } from "zod";
import { ConditionInputTypes, FilterTypes } from "@/models/Analyze.interface";
export const getFilterItemValidator = z.object({
    id: z.number(),
    name: z.string(),
    start_condition_value: z.string(),
    end_condition_value: z.string(),
    p_name: z.string(),
    filter_type: z.nativeEnum(FilterTypes),
    condition_input_type: z.nativeEnum(ConditionInputTypes),
    condition: z.string(),
    des: z.string().nullable(),
});
export const filtersListValidator = z.array(getFilterItemValidator);
//# sourceMappingURL=getFilterItem.vd.js.map