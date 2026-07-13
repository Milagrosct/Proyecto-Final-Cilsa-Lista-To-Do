import express from "express";
import {
    mostrarTareas,
    crear,
    editar,
    eliminar,
    cambiarEstado 
} from "../controllers/tarea.controller.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
const router = express.Router();

//Ruta tareas que necesitan un usuario logueado para poder acceder a ellas

router.get("/", authMiddleware, mostrarTareas);
router.post("/", authMiddleware, crear);
router.post("/editar/:id", authMiddleware, editar);
router.post("/estado/:id", authMiddleware, cambiarEstado);
router.post("/eliminar/:id", authMiddleware, eliminar);

export default router;
