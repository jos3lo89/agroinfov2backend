import { Router } from "express";
import { rolValidarPublicacion } from "../../middlewares/publicacion/authValidarPublicacion";
import { authValidar } from "../../middlewares/usuario/authValidar";
import { uploadMultiple } from "../../middlewares/multer";
import { crearPublicacion } from "../../controllers/publicacion/publicacion.controller";

const router = Router();

// POST / create publicacion
router.post(
  "/publicacion",
  authValidar,
  rolValidarPublicacion,
  uploadMultiple,
  crearPublicacion
);
// GET - publicaciones
router.get("/publicacion/:asociacion_id");
// PUT - actualizar publicacion
router.put("/publicacion/:id");
// DELETE - eliminar publicacion
router.delete("/publicacion/:id");

export default router;
