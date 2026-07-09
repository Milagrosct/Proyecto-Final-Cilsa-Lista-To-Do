import db from "../config/db.js";

// Obtener todas las categorías de un usuario
export const obtenerCategorias = async (id_usuario) => {

    const sql = `
        SELECT *
        FROM categorias
        WHERE id_usuario = ?
        ORDER BY nombre
    `;

    const [rows] = await db.execute(sql, [id_usuario]);

    return rows;
};


// Crear categoría
export const crearCategoria = async (nombre, id_usuario) => {

    const sql = `
        INSERT INTO categorias (nombre, id_usuario)
        VALUES (?, ?)
    `;

    const [resultado] = await db.execute(sql, [nombre, id_usuario]);

    return resultado;
};


// Editar categoría
export const editarCategoria = async (id_categoria, nombre) => {

    const sql = `
        UPDATE categorias
        SET nombre = ?
        WHERE id_categoria = ?
    `;

    const [resultado] = await db.execute(sql, [nombre, id_categoria]);

    return resultado;
};


// Eliminar categoría
export const eliminarCategoria = async (id_categoria) => {

    const sql = `
        DELETE FROM categorias
        WHERE id_categoria = ?
    `;

    const [resultado] = await db.execute(sql, [id_categoria]);

    return resultado;
};