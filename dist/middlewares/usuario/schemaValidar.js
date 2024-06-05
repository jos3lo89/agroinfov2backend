"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCorreoUnico = exports.schemaValidar = void 0;
const zod_1 = require("zod");
const db_1 = __importDefault(require("../../config/db"));
// validar datos de usuario registro
const schemaValidar = (schema) => (req, res, next) => {
    try {
        const body = req.body;
        schema.parse(body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            return res
                .status(400)
                .json({ message: error.errors.map((e) => e.message) });
        }
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.schemaValidar = schemaValidar;
// validar correo de usuario unico
const validarCorreoUnico = (req, res, next) => {
    try {
        const { correo } = req.body;
        const usuario = db_1.default.usuario.findFirst({
            where: {
                correo,
            },
        });
        if (!usuario) {
            next();
        }
        else {
            res.status(400).json({ message: "El correo ya existe" });
        }
    }
    catch (error) {
        res.status(400).json({ message: "El correo ya existe" });
    }
};
exports.validarCorreoUnico = validarCorreoUnico;
