"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crearToken = (payload) => {
    return new Promise((resolve, reject) => {
        if (process.env.JWT_SECRET) {
            jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1d",
            }, (err, token) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(token);
                }
            });
        }
        else {
            reject("JWT_SECRET no encontrado");
        }
    });
};
exports.crearToken = crearToken;
// export const verificarToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "claveSecreta");
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// };
