import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import "./config/db.js";
import usuarioRoutes from "./routes/usuario.routes.js";
import categoriaRoutes from "./routes/categoria.routes.js";

dotenv.config();
const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());

// Configuración de la sesión
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    })
);

server.get("/", (req, res) => {
  res.send("Hello World!");
});

// Rutas
server.use("/api/usuarios", usuarioRoutes);
server.use("/api/categorias", categoriaRoutes);

server.listen(port, () => {
  console.log(`El servidor esta corriendo en: http://localhost:${port}`);
});