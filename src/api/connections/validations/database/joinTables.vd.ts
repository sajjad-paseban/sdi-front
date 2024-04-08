import {z} from "zod";

export const joinTablesValidator=z.array(z.object({}).passthrough())