import { Router } from "express";
import {
  usuarioSchemaActualizarDatos,
  usuarioSchemaCombinarContrasena,
  usuarioSchemaLogin,
  usuarioSchemaRegistro,
} from "../../schemas/usuario/usuario.schema";
import {
  actualizarContrasena,
  actualizarFotoPerfil,
  actualizarUsuarioDatos,
  agregarFotoPerfil,
  cerrarSesion,
  crearUsuario,
  datosUsuaro, eliminarFotoPerfil,
  eliminarUsuario,
  loginUsuario,
} from "../../controllers/usuario/usuario.controller";
import {
  schemaValidar,
  validarCorreoUnico,
} from "../../middlewares/usuario/schemaValidar";
import { authValidar } from "../../middlewares/usuario/authValidar";
import { uploadOne } from "../../middlewares/multer";

const router = Router();

// POST / create user

router.post(
  "/usuario",
  schemaValidar(usuarioSchemaRegistro),
  validarCorreoUnico,
  crearUsuario
);

// POST - login
router.post("/usuario/login", schemaValidar(usuarioSchemaLogin), loginUsuario);

// GET - datos de usuario
router.get("/usuario", authValidar, datosUsuaro);

// POST  - cerrar sesión
router.post("/usuario/cerrar", authValidar, cerrarSesion);

// PUT - actualizar usuario
router.put(
  "/usuario",
  authValidar,
  schemaValidar(usuarioSchemaActualizarDatos),
  actualizarUsuarioDatos
);

// POST - agregar foto de perfil
router.post(
  "/usuario/perfil",
  authValidar,
  uploadOne.single("perfil"),
  agregarFotoPerfil
);

// POST - actualizar foto de perfil
router.put(
  "/usuario/perfil/actualizar",
  authValidar,
  uploadOne.single("perfil"),
  actualizarFotoPerfil
);

// DELETE - eliminar cuenta de  usuario
router.delete("/usuario", authValidar, eliminarUsuario);


// PUT - actualizar contraseña
router.put(
  "/usuario/clave/actualizar",
  authValidar,
  schemaValidar(usuarioSchemaCombinarContrasena),
  actualizarContrasena
);


// DELETE - eliminar foto de perfil
router.delete("/usuario/perfil/foto", authValidar, eliminarFotoPerfil);

export default router;
