import { Router } from "express";
import { authValidar } from "../../middlewares/usuario/authValidar";
import { crearAsociacion } from "../../controllers/asociacion/asociacion.controller";
import { asociacionSchemaRegistro } from "../../schemas/asociacion/asociacion.schema";
import {
  portadaValidar,
  schemaValidarAsociacion,
} from "../../middlewares/asociacion/schemaValidarAsoc";
import { uploadOne } from "../../middlewares/multer";
import { authValidarAsociacion } from "../../middlewares/asociacion/authValidar";

const router = Router();

// POST / create asociacion

router.post(
  "/asociacion",
  authValidar,
  authValidarAsociacion,
  uploadOne.single("portada"),
  schemaValidarAsociacion(asociacionSchemaRegistro),
  portadaValidar,
  crearAsociacion
);

export default router;
