"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./config/app"));
function main() {
    app_1.default.listen(process.env.PORT || 3000, () => {
        console.log(`servidor ejecutándose en el puerto ${process.env.PORT || 3000}`);
    });
}
main();
