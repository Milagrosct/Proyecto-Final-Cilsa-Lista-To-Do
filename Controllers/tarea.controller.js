//el controlador valida los datos del usuario y responde.

import {
    obtenerTareaPorId,
    obtenerMisTareas,
    crearTarea,
    editarTarea,
    eliminarTarea
} from "../Models/tarea.model.js";

//Mostrar
export const mostrarTareas = async(req,res)=>{
    try {

        if(!req.session.usuario){
            return res.redirect("/usuarios/login");
        }

        const id_usuario = req.session.usuario.id_usuario;

        const tareas = await obtenerMisTareas(id_usuario);

        res.render("tareas", {
            tareas,
            usuario: req.session.usuario
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al obtener tareas"
        });
    }
}

export const crear = async (req,res)=>  {

    try {

        const {nombre, descripcion, id_categoria} = req.body;

        if(!nombre || !id_categoria){
            return res.status(400).json({
                mensaje:"Complete los campos obligatorios"
            });
        }

        const id_creador = req.session.usuario.id_usuario;

        const tarea = {
            nombre,
            descripcion,
            id_categoria,
            id_creador
        };


        await crearTarea(tarea);


        res.redirect("/tareas");


    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al crear la tarea"
        });

    }

};

