import { z } from "zod";
export const apartmentAddressValidator = z.object({
    major_street: z.string().nullable(),
    minor_street: z.string().nullable(),
    alley: z.string().nullable(),
    dead_end: z.string().nullable(),
    building_block_name: z.string().nullable(),
    plaque: z.number().nullable(),
    block_name: z.string().nullable(),
    unit_number: z.number().nullable(),
    phone: z.string().nullable(),
    mobile: z.string().nullable(),
    postal_code: z.string().nullable(),
});
//# sourceMappingURL=apartmentAddress.vd.js.map