import {z} from "zod";

import {getRolesTreeValidator} from "@/api/roles/validations/getRolesTree.vd";
import {TreeRole} from "@/models/Role.interface";

type getRolesTreeValidatorGdModel = z.infer<typeof getRolesTreeValidator>;

export function getRolesTreeTransformer(inputValidated: getRolesTreeValidatorGdModel): TreeRole [] {

    const result: TreeRole[] = addSelectToItems(inputValidated)
    console.log(result, 'transport result')
    return result

}

function addSelectToItems(items: getRolesTreeValidatorGdModel): TreeRole[] {

    const result: TreeRole[] = []
    items.forEach((item) => {

        let childRes: TreeRole[]|null = null

        if (item.children) {
            childRes = addSelectToItems(item.children)
        }

        result.push({...item, selected: [], children: childRes})
    })
    return result
}