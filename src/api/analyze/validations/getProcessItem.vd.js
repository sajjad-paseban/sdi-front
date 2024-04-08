import { z } from "zod";
import { ProcessInput, ProcessOutput } from "@/models/Analyze.interface";
export const getProcessItemValidator = z.object({
    id: z.number(),
    name: z.string(),
    p_name: z.string(),
    input_type: z.nativeEnum(ProcessInput),
    output_type: z.nativeEnum(ProcessOutput),
    function_name: z.string(),
    des: z.string()
});
export const processListValidator = z.array(getProcessItemValidator);
//# sourceMappingURL=getProcessItem.vd.js.map