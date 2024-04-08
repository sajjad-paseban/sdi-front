import { z } from "zod";
export const apartmentFacilitiesValidator = z.object({
    facilities_type: z.number(),
    area_count: z.number(),
    code: z.string(),
    description: z.string().nullable()
});
export const apartmentFacilitiesListValidator = z.array(apartmentFacilitiesValidator);
//# sourceMappingURL=apartmentFacilities.vd.js.map