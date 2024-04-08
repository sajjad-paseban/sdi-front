import {z} from "zod";

import {BusinessBoard, floorUsage} from "@/models/Survey.interface";
import {businessBoardListValidator} from "@/api/survey/validations/businessBoards.vd";


type businessBoardValidatorGdModel = z.infer<typeof businessBoardListValidator>;

export function businessBoardTransformer(inputValidated: businessBoardValidatorGdModel): BusinessBoard[] {
    return [...inputValidated]

}