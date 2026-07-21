import db from "../config/db.js";

// Obtener todas las categorías de un usuario
export const obtenerCategorias = async (id_usuario) => {

    const sql = `
        SELECT * FROM categorias
        WHERE id_usuario = ?
        ORDER BY nombre
    `;

    const [rows] = await db.execute(sql, [id_usuario]);

    return rows;
};

export const buscarCategoria = async(nombre, id_usuario) => {
    const sql = "SELECT * FROM categorias where nombre = ? AND id_usuario = ? ";
    const [rows] = await db.execute(sql, [
        nombre, 
        id_usuario
    ]);
    return rows[0];
}
//Obtener categoria por id
export const obtenerCategoriaPorId = async (id_categoria) => {
    const sql = "SELECT * FROM categorias WHERE id_categoria = ?";
    const [rows] = await db.execute(sql, [id_categoria]);
    return rows[0];
}

// Crear categoría
export const crearCategoria = async (categoria) => {
    const {
        nombre, 
        color, 
        id_usuario
    } = categoria;

    const sql = `
        INSERT INTO categorias (nombre, color, id_usuario)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await db.execute(sql, [nombre, color, id_usuario]);

    return resultado;
};


// Editar categoría
export const editarCategoria = async (id_categoria, nombre, color) => {

    const sql = `
        UPDATE categorias
        SET nombre = ?, color = ?
        WHERE id_categoria = ?
    `;

    const [resultado] = await db.execute(sql, [nombre, color, id_categoria]);

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