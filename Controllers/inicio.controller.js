import { obtenerMisTareas } from "../Models/tarea.model.js";

export const mostrarInicio = async (req, res)=> {

    try{
        if(!req.session.usuario){
            return res.redirect("/usuarios/login");
        }

        const tareas = await obtenerMisTareas(req.session.usuario.id_usuario);

        const pendientes = tareas.filter(t => t.id_estado != 3).length;
        const completadas = tareas.filter(t => t.id_estado == 3).length;

        res.render("inicio", {
            usuario: req.session.usuario,
            pendientes,
            completadas
        });

    } catch(error) {    
        console.log(error);
        res.status(500).send("error al cargar el inicio");
    }
};