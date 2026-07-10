import express from "express";
import dotenv from "dotenv";
import session from "express-session";
import "./config/db.js";
import usuarioRoutes from "./Routes/usuario.routes.js";
import categoriaRoutes from "./Routes/categoria.routes.js";
import tareaRoutes from "./Routes/tarea.routes.js";
import path from "path"; 
import { fileURLToPath } from "url";

dotenv.config();
const server = express();
const port = process.env.PORT || 3000;
server.use(express.json());


// Obtener la ruta del directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
server.use(express.static(path.join(__dirname, "Public"))); //archivos estaticos 

// Configuración de la sesión
server.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
    })
);
// Middleware para parsear el cuerpo de las solicitudes
server.use(express.urlencoded({ extended: true }));

//Ruta principal
server.get("/", (req, res) => {
  res.render("inicio");
});

// Configuración de EJS
server.set("view engine", "ejs"); //(Para poder renderizar las vistas con EJS)
server.set("views", path.join(__dirname, "Views")); 

// Rutas
server.use("/usuarios", usuarioRoutes);
server.use("/api/categorias", categoriaRoutes);
server.use("/tareas", tareaRoutes);

//Iniciar el servidor
server.listen(port, () => {
  console.log(`El servidor esta corriendo en: http://localhost:${port}`);
});