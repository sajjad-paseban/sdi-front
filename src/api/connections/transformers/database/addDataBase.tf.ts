import {z} from "zod";


import {MassageConnection} from "@/models/Conncections.interface";
import {addDatabaseValidator} from "@/api/connections/validations/database/addDataBase.vd";

type addDatabaseGdModel = z.infer<typeof addDatabaseValidator>;

export function addDatabaseTransformer(inputValidated: addDatabaseGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}