"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUsuario = exports.crearUsuario = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = __importDefault(require("../../config/db"));
const jwt_1 = require("../../libs/jwt");
// crear usuario
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, apellido, correo, clave } = req.body;
        const hash = yield bcryptjs_1.default.hash(clave, 10);
        const usuario = yield db_1.default.usuario.create({
            data: {
                nombre,
                apellido,
                correo,
                clave: hash,
                rol: "publico",
            },
        });
        res.status(201).json({ message: "Usuario creado", usuario });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: [error.message] });
    }
});
exports.crearUsuario = crearUsuario;
// login usuario
const loginUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { correo, clave } = req.body;
        const usuario = yield db_1.default.usuario.findFirst({
            where: {
                correo,
            },
        });
        if (!usuario) {
            res.status(404).json({ message: "Usuario no encontrado" });
        }
        else {
            const isValid = yield bcryptjs_1.default.compare(clave, usuario.clave);
            if (!isValid) {
                res.status(401).json({ message: "Clave incorrecta" });
            }
            else {
                const token = (0, jwt_1.crearToken)({
                    id: usuario.id,
                    correo: usuario.correo,
                    rol: usuario.rol,
                });
                res.cookie("token", token, {
                    httpOnly: false,
                    secure: true,
                    sameSite: "none",
                });
                res.status(200).json({
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido: usuario.apellido,
                    correo: usuario.correo,
                    rol: usuario.rol,
                    foto_url: usuario.foto_url,
                    foto_id: usuario.foto_id,
                });
            }
        }
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ message: [error.message] });
    }
});
exports.loginUsuario = loginUsuario;
