//el controlador valida los datos del usuario y responde.

import {
    obtenerTareaPorId,
    obtenerMisTareas,
    crearTarea,
    editarTarea,
    eliminarTarea
} from "../Models/tarea.model.js";


export const mostrarTareas = async(req,res)=>{
    try {
    const id_usuario = req.user.id_usuario;

    const tareas = await obtenerMisTareas(id_usuario);

    res.render("tareas", {
        tareas
    });

} catch (error) {
    console.log(error);
    res.status(500).json({
        mensaje: "Error al obtener tareas"
        });
    };
}
//crear tarea 
export const crear = async (req, res) => {
    try {
    const {nombre, descripcion, id_categoria} = req.body;
    
    //Validar campos vacios
    if(!nombre || !id_categoria) {
        return res.status(400).json({
            mensaje: "Complete los campos obligatorios"
        }); 
    }
    //Obtener usuario logueado
    const id_creador = req.user.id_usuario; // obtener el id del usuario que creo la tarea 
    //Crear el objeto tarea
    const tarea = {
        nombre,
        descripcion,
        id_categoria,
        id_creador
    };    

   //Mandar al modelo
   const resultado = await crearTarea(tarea); //el await hace que espere hasta que cargue la base de datos y luego sigue ejecutando el codigo.
    res.redirect("/tareas");
   //responder al cliente
  /*  res.json({
    mensaje: "Tarea creada correctamente", 
    resultado
   }); */
     } catch (error) {
        console.log(error);
        res.status(500).json({
            mensaje: "Error al crear la tarea"
        });
    }
};

