"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.usuarioSchemaRegistro = void 0;
const zod_1 = require("zod");
exports.usuarioSchemaRegistro = zod_1.z.object({
    nombre: zod_1.z
        .string({
        required_error: "El nombre es requerido",
        invalid_type_error: "El nombre debe ser un string",
    })
        .min(1, {
        message: "El nombre debe tener al menos un caracter",
    }),
    apellido: zod_1.z
        .string({
        required_error: "El apellido es requerido",
        invalid_type_error: "El apellido debe ser un string",
    })
        .min(1, {
        message: "El apellido debe tener al menos un caracter",
    }),
    correo: zod_1.z
        .string({
        required_error: "El correo es requerido",
        invalid_type_error: "El correo debe ser un string",
    })
        .email({
        message: "El correo no es válido",
    })
        .min(1, {
        message: "El correo debe tener al menos un caracter",
    }),
    clave: zod_1.z
        .string({
        required_error: "La clave es requerida",
        invalid_type_error: "La clave debe ser un string",
    })
        .min(6, {
        message: "La clave debe tener al menos 6 caracteres",
    }),
});
