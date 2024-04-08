import {z} from "zod";
import {tableInfoByNameValidator} from "@/api/tables/validations/tableInfoByName.vd";
import {TableInfoInterface} from "@/models/Table.interface";

type tableInfoByNameGdModel = z.infer<typeof tableInfoByNameValidator>;

export function tableInfoByNameTransformer(inputValidated: tableInfoByNameGdModel): TableInfoInterface[] {

    return inputValidated.map((item)=>{
        return {
            model:item.model,
            pk:item.pk,
            ...item.fields
        }
    })




}