import { z } from "zod";
export const getTableFieldsValidator = z.array(z.object({
    column_name: z.string(),
    is_nullable: z.string(),
    data_type: z.string()
}));
//# sourceMappingURL=getTableFields.vd.js.map