"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const usuario_routes_1 = __importDefault(require("../routes/usuario/usuario.routes"));
const app = (0, express_1.default)();
// middlewares
app.use((0, morgan_1.default)("dev"));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static("public"));
// routes
app.use("/api", usuario_routes_1.default);
// error handler
app.use("/ping", (_req, res) => {
    res.status(404).json({ message: "pong" });
});
exports.default = app;
