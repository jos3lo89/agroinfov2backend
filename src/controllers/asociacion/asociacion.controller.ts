import { Request, Response } from "express";
import prisma from "../../config/db";

// POST / create asociacion
export const crearAsociacion = async (req: Request, res: Response) => {
  try {

    console.log(req.body);
    const { nombre, descripcion, admin_id } = req.body;
    // const admin_id = req.user?.id;
    const portada = req.file;

    if (!admin_id) {
      return res.status(401).json({ message: "No tienes acceso" });
    }

    const asociacion = await prisma.asociaciones.create({
      data: {
        nombre,
        descripcion,
        portada_url: `/uploads/${portada?.filename}`,
        admin_id,
      },
    });

    res.status(201).json({ message: "Asociacion creada", asociacion });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
