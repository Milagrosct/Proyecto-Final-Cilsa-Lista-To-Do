
//Endpoint para registrar un usuario

import express from "express";

import {
    registrar,
    login,
    logout
} from "../controllers/usuario.controller.js";


const router = express.Router();

//Mostrar form de registro/login
router.get("/registro", (req, res) => {
    res.render("login/registro", {
        mensaje: null //Cuando vamos a la pagina /usuarios/registro, EJS recibe mensaje inicializado en null.
    }); 
    
});
//mostrar el form del login 
router.get("/login", (req, res) => {
    res.render("login/login", {
        mensaje: null
    });
});

//Recibir datos del registro/login
router.post("/registro", registrar);
router.post("/login", login);
router.get("/logout", logout);

export default router;