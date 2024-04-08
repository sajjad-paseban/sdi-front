import {z} from "zod";
import {getTablesValidator} from "@/api/tables/validations/getTables.vd";

type getTablesGdModel = z.infer<typeof getTablesValidator>;

export function getTablesTransformer(inputValidated: getTablesGdModel): string[] {


    return [...inputValidated]


}