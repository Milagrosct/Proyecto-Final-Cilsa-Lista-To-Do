import {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    editarCategoria,
    buscarCategoria,
    eliminarCategoria
} from "../models/categoria.model.js";


// Listar categorías
export const listar = async (req, res) => {

    try {
        if (!req.session.usuario) {
            return res.redirect("/usuarios/login")
        }
        const id_usuario = req.session.usuario.id_usuario;
        const categorias = await obtenerCategorias(id_usuario);
        res.render("categorias/index", {
            categorias,
            mensaje: null
        });
        
    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al obtener categorías"
        });

    }

};


// Crear categoría
export const crear = async (req, res) => {

    try {

        const { nombre } = req.body;

        
        if(!nombre){
                return res.render("categorias/index", {
                    categorias: [],
                    mensaje: "Ingrese un nombre para la categoria"
                })
        }

        //cada usuario crea sus propias categorias
        const id_usuario = req.session.usuario.id_usuario;
        //verificar duplicado
        const existe = await buscarCategoria(nombre, id_usuario);
        if(existe){
            const categorias = await obtenerCategorias(id_usuario);
            return res.render("categorias/index", {
                categorias, 
                mensaje:"Ya existe una categoria con ese nombre"
            });
        }

        await crearCategoria({
            nombre,
            id_usuario
        });

        res.redirect("/categorias");

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al crear categoría"
        });

    }

};


// Editar categoría
export const editar = async (req, res) => {

    try {

        const { id } = req.params;
        const { nombre } = req.body;

        await editarCategoria(id, nombre);

        res.json({
            mensaje: "Categoría actualizada"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al actualizar categoría"
        });

    }

};


// Eliminar categoría
export const eliminar = async (req, res) => {

    try {

        const { id } = req.params;

        await eliminarCategoria(id);

        res.json({
            mensaje: "Categoría eliminada"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar categoría"
        });

    }

};