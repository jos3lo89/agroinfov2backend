import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../config/db";
import { crearToken } from "../../libs/jwt";
import * as fs from "node:fs/promises";

// crear usuario
export const crearUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, correo, clave } = req.body;

    const hash = await bcrypt.hash(clave, 10);

    const usuario = await prisma.usuario.create({
      data: {
        nombre,
        apellido,
        correo,
        clave: hash,
        rol: "publico",
      },
    });

    res.status(201).json({ message: "Usuario creado", usuario });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// login usuario
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { correo, clave } = req.body;

    const usuario = await prisma.usuario.findFirst({
      where: {
        correo,
      },
    });

    if (!usuario) {
      res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      const isValid = await bcrypt.compare(clave, usuario.clave);

      if (!isValid) {
        res.status(401).json({ message: "Clave incorrecta" });
      } else {
        const token = await crearToken({
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
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// datos de usuario
export const datosUsuaro = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    if (!id) {
      res.status(401).json({ message: "No tienes acceso" });
    }

    console.log(id);

    const ususario = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!ususario) {
      return res.status(404).json({ message: ["Usuario no encontrado"] });
    }

    res.status(200).json({
      id: ususario.id,
      nombre: ususario.nombre,
      apellido: ususario.apellido,
      correo: ususario.correo,
      rol: ususario.rol,
      foto_url: ususario.foto_url,
      foto_id: ususario.foto_id,
      fecha_creacion: ususario.fecha_creacion,
      fecha_actualizacion: ususario.fecha_actualizacion,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// cerrrar sesion
export const cerrarSesion = async (req: Request, res: Response) => {
  try {
    res.clearCookie("token");
    res.sendStatus(204);
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// POST - actualizar usuario datos
export const actualizarUsuarioDatos = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, apellido } = req.body;

    console.log(nombre, apellido, id);
    const usuario = await prisma.usuario.update({
      where: {
        id,
      },
      data: {
        nombre,
        apellido,
      },
    });

    console.log(usuario);
    res.status(200).json({
      id: usuario.id,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      correo: usuario.correo,
      rol: usuario.rol,
      foto_url: usuario.foto_url,
      foto_id: usuario.foto_id,
      fecha_creacion: usuario.fecha_creacion,
      fecha_actualizacion: usuario.fecha_actualizacion,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// POST - agregar foto de perfil
export const agregarFotoPerfil = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    const userfound = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!req.file) {
      return res.status(400).json({ message: "No se ha enviado una imagen" });
    }

    if (!userfound) {
      await fs.unlink(`./public/uploads/${req.file.filename}`);
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (userfound.foto_url) {
      await fs.unlink(`./public/uploads/${req.file.filename}`);
      return res.status(400).json({ message: "Ya existe una foto" });
    }

    await prisma.usuario.update({
      where: { id },
      data: {
        foto_url: `/uploads/${req.file.filename}`,
      },
    });

    res.status(200).json({ message: "perfil agregado" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// POST - actualizar foto de perfil
export const actualizarFotoPerfil = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    const userFound = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    } else {
      await fs.unlink(`./public${userFound.foto_url}`);
    }

    if (!req.file) {
      return res.status(400).json({ message: "No se ha enviado una imagen" });
    }

    await prisma.usuario.update({
      where: { id },
      data: {
        foto_url: `/uploads/${req.file.filename}`,
      },
    });

    res.status(200).json({ message: "perfil actualizado" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// DELETE - eliminar cuenta de  usuario
export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    const { clave } = req.body;

    if (!clave) {
      return res.status(400).json({ message: "Clave no enviada" });
    }

    const userFound = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(clave, userFound.clave);

    if (!isValid) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    if (userFound.foto_url) {
      await fs.unlink(`./public${userFound.foto_url}`);
    }

    await prisma.usuario.delete({
      where: {
        id,
      },
    });

    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};

// PUT - actualizar contraseña
export const actualizarContrasena = async (req: Request, res: Response) => {
  try {
    const id = req.user?.id;

    const { clave, nuevaClave } = req.body;

    if (!clave) {
      return res.status(400).json({ message: "Clave no enviada" });
    }

    if (!nuevaClave) {
      return res.status(400).json({ message: "Nueva clave no enviada" });
    }

    const userFound = await prisma.usuario.findFirst({
      where: {
        id,
      },
    });

    if (!userFound) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const isValid = await bcrypt.compare(clave, userFound.clave);

    if (!isValid) {
      return res.status(401).json({ message: "Clave incorrecta" });
    }

    const hash = await bcrypt.hash(nuevaClave, 10);

    await prisma.usuario.update({
      where: { id },
      data: {
        clave: hash,
      },
    });

    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
