import { z } from "zod";
import { businessPersonArrayValidator } from "@/api/survey/validations/businessPerson.vd";
import { businessVacationArrayValidator } from "@/api/survey/validations/businessVacation.vd";
export const businessInfoValidator = z.object({
    id: z.number().optional(),
    name: z.string(),
    business_job_reference: z.number(),
    business_job_category: z.number(),
    business_level: z.number(),
    business_pollution_level: z.number().nullable(),
    no_license_reason: z.number().nullable(),
    ownership_unit_type: z.number().nullable(),
    ownership_value: z.string().nullable(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    settlement_date: z.string().nullable(),
    employee_count: z.number().nullable(),
    special_pollution: z.boolean().nullable(),
    temporary: z.boolean().nullable(),
    star_business: z.boolean().nullable(),
    pollution_value: z.string(),
    business_BusinessPerson: businessPersonArrayValidator.nullable().optional(),
    business_BusinessVacation: businessVacationArrayValidator.nullable().optional(),
});
export const businessInfoArrayValidator = z.array(businessInfoValidator);
//# sourceMappingURL=businessInfo.vd.js.map