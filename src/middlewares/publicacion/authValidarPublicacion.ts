import { Request, Response, NextFunction } from "express";

export const rolValidarPublicacion = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: ["No tienes acceso"] });
    }

    if (user.rol !== "admin_asociaciones") {
      return res.status(401).json({ message: ["No tienes acceso"] });
    }

    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
