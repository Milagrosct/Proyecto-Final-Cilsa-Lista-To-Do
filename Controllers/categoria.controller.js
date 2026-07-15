import {
    obtenerCategorias,
    crearCategoria,
    editarCategoria,
    buscarCategoria,
    eliminarCategoria
} from "../models/categoria.model.js";



// Listar

export const listar = async (req, res) => {

    try {

        if (!req.session.usuario) {
            return res.redirect("/usuarios/login");
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



// Crear


export const crear = async (req, res) => {

    try {

        const { nombre } = req.body;

        const id_usuario = req.session.usuario.id_usuario;

        if (!nombre) {

            const categorias = await obtenerCategorias(id_usuario);

            return res.render("categorias/index", {
                categorias,
                mensaje: "Ingrese un nombre para la categoría"
            });

        }

        const existe = await buscarCategoria(
            nombre,
            id_usuario
        );

        if (existe) {

            const categorias = await obtenerCategorias(id_usuario);

            return res.render("categorias/index", {
                categorias,
                mensaje: "Ya existe una categoría con ese nombre"
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



// Editar


export const editar = async (req, res) => {

    try {

        const { id } = req.params;
        const { nombre } = req.body;

        await editarCategoria(id, nombre);

        res.redirect("/categorias");

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al editar categoría"
        });

    }

};



// Eliminar


export const eliminar = async (req, res) => {

    try {

        const { id } = req.params;

        await eliminarCategoria(id);

        res.redirect("/categorias");

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar categoría"
        });

    }

};