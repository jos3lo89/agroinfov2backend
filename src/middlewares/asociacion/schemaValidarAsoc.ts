import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import * as fs from "node:fs/promises";

// validar datos de asociacion
export const schemaValidarAsociacion =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const body = Object.assign({}, req.body);
      schema.parse(body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        if (req.file) {
          await fs.unlink(`./public/uploads/${req.file.filename}`);
        }

        return res
          .status(400)
          .json({ message: error.errors.map((e) => e.message) });
      }
    }
  };


  // validar foto de portada de asociacion
export const portadaValidar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const portada = req.file;

    if (!portada) {
      return res.status(400).json({ message: "No se ha enviado una imagen" });
    }

    const mimetypes = ["image/jpeg", "image/png", "image/webp"];

    if (!mimetypes.includes(portada.mimetype)) {
      await fs.unlink(`./public/uploads/${portada.filename}`);
      return res
        .status(400)
        .json({ message: "La imagen debe ser de tipo jpeg, png o webp" });
    }

    next();
  } catch (error: any) {
    res.status(400).json({ message: [error.message] });
  }
};
