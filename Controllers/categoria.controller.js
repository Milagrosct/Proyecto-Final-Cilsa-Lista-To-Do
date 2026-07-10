import {
    obtenerCategorias,
    obtenerCategoriaPorId,
    crearCategoria,
    editarCategoria,
    eliminarCategoria
} from "../models/categoria.model.js";


// Listar categorías
export const listar = async (req, res) => {

    try {

        const id_usuario = req.session.usuario.id_usuario;
        const categorias = await obtenerCategorias(id_usuario);
        res.render("categorias/index", {
            categorias
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

        await crearCategoria(nombre, 1);

       res.redirect("/categorias");

        if(!nombre){
                return res.status(400).json({
        mensaje: "Ingrese un nombre para la categoría"
    });

        }
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