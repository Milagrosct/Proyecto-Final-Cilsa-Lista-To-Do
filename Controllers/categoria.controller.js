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

          const success = req.session.success;

        delete req.session.success;

        res.render("categorias/index", {
            categorias,
            success
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

        const { nombre, color} = req.body;

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
            color,
            id_usuario
        });
        req.session.success = "La categoría se creó correctamente.";
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
        const { nombre, color } = req.body;

        await editarCategoria(id, nombre, color);

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
        req.session.success = "La categoría se eliminó correctamente.";
        res.redirect("/categorias");

    } catch (error) {

        console.log(error);

        res.status(500).json({
            mensaje: "Error al eliminar categoría"
        });

    }

};