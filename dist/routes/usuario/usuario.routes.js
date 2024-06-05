"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuario_schema_1 = require("../../schemas/usuario/usuario.schema");
const usuario_controller_1 = require("../../controllers/usuario/usuario.controller");
const schemaValidar_1 = require("../../middlewares/usuario/schemaValidar");
const router = (0, express_1.Router)();
// POST / create user
router.post("/usuario", (0, schemaValidar_1.schemaValidar)(usuario_schema_1.usuarioSchemaRegistro), schemaValidar_1.validarCorreoUnico, usuario_controller_1.crearUsuario);
exports.default = router;
