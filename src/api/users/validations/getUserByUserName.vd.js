import { z } from "zod";
export const getUserByUserNameValidator = z.object({
    first_name: z.string().min(1),
    last_name: z.string().min(1),
    user_name: z.string().min(1),
    password: z.string().min(1),
    email: z.string().min(1).nullable(),
    address: z.string().min(1).nullable(),
    image: z.string().min(1).nullable(),
    city: z.string().min(1).nullable(),
    state: z.string().min(1).nullable(),
    phone: z.string(),
    role: z.number(),
    connected_device: z.number(),
    national_code: z.number().optional().nullable(),
    id: z.number().optional(),
    is_active: z.boolean(),
    sms_login: z.boolean(),
    check_ip: z.boolean(),
});
//# sourceMappingURL=getUserByUserName.vd.js.map