import express from "express";

import {
    listar,
    crear,
    editar,
    eliminar
} from "../controllers/categoria.controller.js";

const router = express.Router();

router.get("/", listar);

router.post("/", crear);

router.put("/:id", editar);

router.delete("/:id", eliminar);

export default router;