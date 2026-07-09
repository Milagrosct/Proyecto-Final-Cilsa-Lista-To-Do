import express from "express";
import {
    obtener,
    obtenerPorId,
    crear,
    editar,
    eliminar
} from "../controllers/tarea.controller.js";

import { authMiddleware } from "../Middleware/auth.middleware.js";
const router = express.Router();

//Ruta tareas que necesitan un usuario logueado para poder acceder a ellas

router.get("/", authMiddleware, mostrarTareas);

router.get("/", authMiddleware, obtener);

router.get("/:id", authMiddleware, obtenerPorId);

router.post("/", authMiddleware, crear);

router.put("/:id", authMiddleware, editar);

router.delete("/:id", authMiddleware, eliminar);

export default router;
