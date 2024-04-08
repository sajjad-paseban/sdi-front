import {z} from "zod";

import {AccessWithParentName} from "@/models/Access.interface";
import {getAccessWithParentNameValidator} from "@/api/access/validations/getAccessWithParentName.vd";

type getAccessWithParentNameGdModel = z.infer<typeof getAccessWithParentNameValidator>;

export function getAccessWithParentNameTransformer(inputValidated: getAccessWithParentNameGdModel): AccessWithParentName[] {
    const result: AccessWithParentName[] = []
    inputValidated.forEach((access) => {

        let item: AccessWithParentName
        if (access.parent) {
            item = {
                ...access,
                parent:access.parent.e_name,
            }

        } else {
            item = {...access, parent: null}

        }
        result.push(item)

    })

    console.log(result, 'transport result')
    return result

}