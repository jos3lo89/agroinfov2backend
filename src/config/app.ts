import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import routerUsuario from "../routes/usuario/usuario.routes";
import routerAsociacion from "../routes/asociacion/asociacion.routes";
import routerPublicacion from "../routes/publicacion/publicacion.routes";
import  cors from "cors";

const app = express();

app.use(cors({
  credentials: true,
    origin:  process.env.URL_CLIENT || "http://localhost:5173/",
}));

// middlewares
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes

//rutas de usuario
app.use("/api", routerUsuario);

//rutas de asociacion
app.use("/api", routerAsociacion);

//rutas de publicacion
app.use("/api", routerPublicacion);

// error handler
app.use("/ping", (_req: Request, res: Response) => {
  res.status(404).json({ message: "pong" });
});

export default app;
