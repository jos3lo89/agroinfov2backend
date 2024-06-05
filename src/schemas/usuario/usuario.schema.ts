import { z } from "zod";

// schema para registrar usuario
export const usuarioSchemaRegistro = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un string",
    })
    .min(1, {
      message: "El nombre debe tener al menos un caracter",
    }),
  apellido: z
    .string({
      required_error: "El apellido es requerido",
      invalid_type_error: "El apellido debe ser un string",
    })
    .min(1, {
      message: "El apellido debe tener al menos un caracter",
    }),
  correo: z
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
  clave: z
    .string({
      required_error: "La clave es requerida",
      invalid_type_error: "La clave debe ser un string",
    })
    .min(6, {
      message: "La clave debe tener al menos 6 caracteres",
    }),
});

// schema para login usuario

export const usuarioSchemaLogin = z.object({
  correo: z
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
  clave: z
    .string({
      required_error: "La clave es requerida",
      invalid_type_error: "La clave debe ser un string",
    })
    .min(6, {
      message: "La clave debe tener al menos 6 caracteres",
    }),
});

// actulizar usuario datos
export const usuarioSchemaActualizarDatos = z.object({
  nombre: z
    .string({
      required_error: "El nombre es requerido",
      invalid_type_error: "El nombre debe ser un string",
    })
    .min(1, {
      message: "El nombre debe tener al menos un caracter",
    }),
  apellido: z
    .string({
      required_error: "El apellido es requerido",
      invalid_type_error: "El apellido debe ser un string",
    })
    .min(1, {
      message: "El apellido debe tener al menos un caracter",
    }),
});


// combiar contraseña schema
export const usuarioSchemaCombinarContrasena = z.object({
  clave: z
    .string({
      required_error: "La clave es requerida",
      invalid_type_error: "La clave debe ser un string",
    })
    .min(6, {
      message: "La clave debe tener al menos 6 caracteres",
    }),
  nuevaClave: z.string({
    required_error: "La nueva clave es requerida",
    invalid_type_error: "La nueva clave debe ser un string",
  })
    .min(6, {
      message: "La nueva clave debe tener al menos 6 caracteres",
    }),
});