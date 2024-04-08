import {z} from "zod";
import {addArchiveGroupListValidator} from "@/api/survey/validations/getArchiveGroup.vd";
import {ArchiveGroup} from "@/models/Survey.interface";



type getArchiveGroupValidatorGdModel = z.infer<typeof addArchiveGroupListValidator>;

export function getArchiveGroupTransformer(inputValidated: getArchiveGroupValidatorGdModel): ArchiveGroup[] {
    return [...inputValidated]

}