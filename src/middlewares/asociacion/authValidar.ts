import { Request, Response, NextFunction } from "express";

export const authValidarAsociacion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({ message: "token no encontrado" });
    }

    if (user.rol !== "admin_general") {
      return res
        .status(401)
        .json({ message: "Tu nivel de acceso no es suficiente" });
    }

    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
