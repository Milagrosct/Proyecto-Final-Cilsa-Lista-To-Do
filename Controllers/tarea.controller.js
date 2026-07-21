// controlador valida datos y responde

// modelo tarea.model.js
import {
    obtenerMisTareas, crearTarea, editarTarea, eliminarTarea
} from "../Models/tarea.model.js";

// modelo categoria.model.js
import { obtenerCategorias } from "../Models/categoria.model.js";

// modelo detalle_tarea.model.js
import {
    crearDetalleTarea, editarDetalleTarea, eliminarDetalleTarea, cambiarEstadoTarea
} from "../Models/detalle_tarea.model.js";


// Mostrar tareas
export const mostrarTareas = async(req,res)=>{

    try {

        if(!req.session.usuario){
            return res.redirect("/usuarios/login");
        }

        const id_usuario = req.session.usuario.id_usuario;

        const filtros = {
            buscar: req.query.buscar || "",
            categoria: req.query.categoria || "",
            prioridad: req.query.prioridad || ""
        };

        const tareas = await obtenerMisTareas(
            id_usuario,
            filtros
        );

        const categorias = await obtenerCategorias(id_usuario);

        const success = req.session.success;

delete req.session.success;

res.render("tareas/index",{
    tareas,
    categorias,
    usuario:req.session.usuario,
    filtros,
    success
});


    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al obtener tareas"
        });

    }

}

// Crear tarea
export const crear = async(req,res)=>{

    try {
        const {
            nombre,
            descripcion,
            id_categoria,
            prioridad,
            fecha_inicio,
            fecha_vencimiento
        } = req.body;

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

        // validar fechas

        if(
            fecha_inicio &&
            fecha_vencimiento &&
            fecha_vencimiento < fecha_inicio
        ){

            return res.status(400).json({
                mensaje:"La fecha de vencimiento no puede ser anterior"
            });

        }

        const resultado = await crearTarea(tarea);
        const id_tarea = resultado.insertId;

        await crearDetalleTarea({

            id_usuario:id_creador,
            id_tarea,
            id_estado:1,
            prioridad: prioridad || "Media",
            fecha_inicio,
            fecha_vencimiento

        });

        req.session.success = "La tarea se agregó correctamente.";
        res.redirect("/tareas");

    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al crear tarea"
        });

    }

};

// Editar tarea

export const editar = async(req,res)=>{

    try {

        const id_tarea = req.params.id;
        const {
            nombre,
            descripcion,
            id_categoria,
            prioridad,
            fecha_inicio,
            fecha_vencimiento
        } = req.body;

        await editarTarea(id_tarea,{

            nombre,
            descripcion,
            id_categoria

        });


        await editarDetalleTarea(id_tarea,{
            prioridad,
            fecha_inicio,
            fecha_vencimiento
        });
        req.session.success = "La tarea se actualizó correctamente.";
        res.redirect("/tareas");

    } catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al editar tarea"
        });

    }

};


// Cambiar estado

export const cambiarEstado = async(req,res)=>{

    try{
        const id_tarea = req.params.id;
        const {id_estado}=req.body;

        await cambiarEstadoTarea(
            id_tarea,
            id_estado
        );

        res.redirect("/tareas");

    }catch(error){

        console.log(error);
        res.status(500).json({
            mensaje:"Error al cambiar estado"
        });

    }

};

// Eliminar
export const eliminar = async(req,res)=>{
    try{

        const id_tarea=req.params.id;
        await eliminarDetalleTarea(id_tarea);
        await eliminarTarea(id_tarea);
        res.redirect("/tareas");

    }catch(error){

        console.log(error);

        res.status(500).json({
            mensaje:"Error al eliminar tarea"
        });

    }

};