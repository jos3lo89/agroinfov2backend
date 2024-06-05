import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import prisma from "../../config/db";

// validar datos de usuario registro
export const schemaValidar =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = req.body;
      schema.parse(body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(400)
          .json({ message: error.errors.map((e) => e.message) });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

// validar correo de usuario unico
export const validarCorreoUnico = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const correo = req.body.correo;
    if (correo) {
      const userFound = await prisma.usuario.findFirst({
        where: { correo },
      });

      if (userFound) {
        return res.status(400).json({ message: ["El correo ya existe"] });
      }
    }
    next();
  } catch (error: any) {
    res.status(500).json({ message: [error.message] });
  }
};
