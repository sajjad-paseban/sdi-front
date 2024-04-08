
//T1:تایپ دیتای خروجی مورد نظر ما




import {z} from "zod";
import {MyApi} from "@/models/Access.interface";
import {getAllRoutesValidator} from "@/api/access/validations/getAllRoutes.vd";

type getAllRoutesGdModel = z.infer<typeof getAllRoutesValidator >;

export function getAllRoutesTransformer(inputValidated:getAllRoutesGdModel):MyApi[]{
    return [...inputValidated]

}