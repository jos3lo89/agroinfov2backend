import { z } from "zod";

export const asociacionSchemaRegistro = z.object({
    nombre: z
        .string({
            required_error: "El nombre es requerido",
            invalid_type_error: "El nombre debe ser un string",
        })
        .min(1, {
            message: "El nombre debe tener al menos un caracter",
        }),
    descripcion: z
        .string({
            required_error: "El descripcion es requerido",
            invalid_type_error: "El descripcion debe ser un string",
        })
        .min(1, {
            message: "El descripcion debe tener al menos un caracter",
        }),
    admin_id: z
        .string({
            required_error: "El admin_id es requerido",
            invalid_type_error: "El admin_id debe ser un string",
        })
        .min(1, {
            message: "El admin_id debe tener al menos un caracter",
        }),
});
