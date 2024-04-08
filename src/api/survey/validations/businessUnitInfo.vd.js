import { z } from "zod";
import { businessInfoValidator } from "@/api/survey/validations/businessInfo.vd";
import { getApartmentValidator } from "@/api/survey/validations/getApartmentsList.vd";
import { buildingValidator } from "@/api/survey/validations/building.vd";
export const businessUnitInfoValidator = z.object({
    id: z.number().optional(),
    code: z.string(),
    area: z.number(),
    store_area: z.number(),
    out_area: z.number(),
    floor_type: z.number().nullable(),
    canopy_area: z.number(),
    business_mabar_type: z.number().nullable(),
    business_location_type: z.number().nullable(),
    business_location_position: z.number().nullable(),
    maabar_lat: z.number(),
    description: z.string().nullable(),
    building: buildingValidator.optional().nullable(),
    apartment: getApartmentValidator.optional().nullable(),
    match: z.boolean().nullable(),
    opening_payment: z.boolean().nullable(),
    board_payment: z.boolean().nullable(),
    canopy_payment: z.boolean().nullable(),
    possession_type: z.number().nullable(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    businessUnit_business: businessInfoValidator.nullable().optional(),
});
export const businessUnitInfoArrayValidator = z.array(businessUnitInfoValidator);
//# sourceMappingURL=businessUnitInfo.vd.js.map