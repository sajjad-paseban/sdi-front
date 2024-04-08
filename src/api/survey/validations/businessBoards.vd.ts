import {z} from "zod";

export const businessBoardsValidator = z.object({
    board_type: z.number().nullable(),
    subject_board: z.number().nullable(),
    installation_location_board: z.number().nullable(),
    installation_status_board: z.number().nullable(),
    owner_board_type: z.number().nullable(),
    board_width: z.number().nullable(),
    board_height: z.number().nullable(),
    height: z.number().nullable(),
    board_area: z.number().nullable(),
    progress_area: z.number().nullable(),
    text:  z.string(),
    description: z.string().nullable(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
    business_businessUnit: z.number().optional(),
})

export const businessBoardListValidator = z.array(businessBoardsValidator)
