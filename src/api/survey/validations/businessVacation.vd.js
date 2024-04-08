import { z } from "zod";
export const businessVacationValidator = z.object({
    id: z.number().optional(),
    business: z.number().optional(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    description: z.string().nullable()
});
export const businessVacationArrayValidator = z.array(businessVacationValidator);
//# sourceMappingURL=businessVacation.vd.js.map