import {z} from "zod";


import {MassageConnection} from "@/models/Conncections.interface";
import {addDatabaseValidator} from "@/api/connections/validations/database/addDataBase.vd";
import {checkDataBaseValidator} from "@/api/connections/validations/database/checkDataBase.vd";

type checkDataBaseGdModel = z.infer<typeof checkDataBaseValidator>;

export function checkDataBaseTransformer(inputValidated: checkDataBaseGdModel): MassageConnection {
    return {
        massage: inputValidated.massage
    }
}