import jwt from "jsonwebtoken";
import { Payload } from "../types/types";

export const crearToken = (payload: Payload) => {
  return new Promise((resolve, reject) => {
    if (process.env.JWT_SECRET) {
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: "1d",
        },
        (err, token) => {
          if (err) {
            reject(err);
          } else {
            resolve(token);
          }
        }
      );
    } else {
      reject("JWT_SECRET no encontrado");
    }
  });
};

// export const verificarToken = (token: string) => {
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "claveSecreta");
//     return decoded;
//   } catch (error) {
//     return null;
//   }
// };
