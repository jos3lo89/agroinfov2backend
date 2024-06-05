import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routerUsuario from "../routes/usuario/usuario.routes";

const app = express();
// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes

app.use("/api", routerUsuario);

// error handler
app.use("/ping",(_req: Request, res: Response) => {
  res.status(404).json({ message: "pong" });
});

export default app;
