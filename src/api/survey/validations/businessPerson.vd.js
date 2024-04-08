import { z } from "zod";
import { apartmentPersonValidator } from "@/api/survey/validations/apartmentPerson.vd";
export const businessPersonValidator = z.object({
    id: z.number().optional(),
    business: z.number(),
    person: apartmentPersonValidator,
    finish: z.boolean(),
    relationship_type: z.number().nullable(),
    ownership_value: z.string(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable()
});
export const businessPersonArrayValidator = z.array(businessPersonValidator);
//# sourceMappingURL=businessPerson.vd.js.map