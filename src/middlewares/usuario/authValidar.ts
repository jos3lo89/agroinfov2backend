import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Decoded } from "../../types/types";

const secret = process.env.JWT_SECRET;

export const authValidar = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "No tienes acceso" });
    }

    if (!secret) {
      return res
        .status(500)
        .json({ message: ["No se ha configurado el secreto de JWT"] });
    }

    const decoded = jwt.verify(token, secret) as Decoded;

    req.user = decoded;

    next();
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: [error.message] });
  }
};
