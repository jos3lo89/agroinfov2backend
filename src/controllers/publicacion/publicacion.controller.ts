import { Request, Response } from "express";
import prisma from "../../config/db";

// POST / create publicacion
export const crearPublicacion = async (req: Request, res: Response) => {
  try {
    const { asociacion_id, titulo, contenido1, contenido2 } = req.body;

    console.log(req.body);
    console.log(req.files);

    // const foto1 = req.files?.foto1 ? req.files.foto1[0].path : null;
    // const foto2 = req.files?.foto2 ? req.files.foto2[0].path : null;

    // if (!asociacion_id) {
    //   return res
    //     .status(400)
    //     .json({ message: ["No se ha enviado el asociacion_id"] });
    // }

    // const publicacion = await prisma.publicaciones.upsert({
    //   where: { id:  },
    //   create: {
    //     asociacion_id,
    //     titulo,
    //     contenido1,
    //     contenido2,
    //   },
    //   update: {
    //     asociacion_id,
    //     titulo,
    //     contenido1,
    //     contenido2,
    //   },
    // });

    res.status(200).json({ message: "Publicacion creada" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
// PUT / update publicacion

// DELETE / delete publicacion

// GET / mostrar publicacion
