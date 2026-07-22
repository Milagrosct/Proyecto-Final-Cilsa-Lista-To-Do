

import db from "../config/db.js"


//Obtener/mostrar
//Obtener una tarea por id
export const obtenerTareaPorId = async (id_tarea) => {
    const sql = `SELECT * from tareas where id_tarea = ?`;

    const [rows] = await db.execute(sql, [id_tarea]);
    return rows[0]; //retorna la primera fila del resultado de la consulta, que es la tarea con el id especificado.
}
//Obtener todas las tareas de un usuario
//left join para que en categorias no devuelva numeros sino los nombres.
export const obtenerMisTareas = async (id_usuario, filtros = {}) => {

    let sql = `

        SELECT
            tareas.*,

            categorias.nombre AS categoria,
            categorias.color AS color_categoria,
            creador.nombre AS nombre_creador,
            creador.apellido AS apellido_creador,

            detalle_tarea.id_estado,
            estados.nombre AS estado,
            detalle_tarea.prioridad,
            detalle_tarea.fecha_inicio,
            detalle_tarea.fecha_vencimiento

        FROM tareas

        INNER JOIN categorias
            ON tareas.id_categoria = categorias.id_categoria

        INNER JOIN usuarios AS creador
            ON tareas.id_creador = creador.id_usuario

        INNER JOIN detalle_tarea
            ON tareas.id_tarea = detalle_tarea.id_tarea

        INNER JOIN estados
            ON detalle_tarea.id_estado = estados.id_estado

        WHERE detalle_tarea.id_usuario = ?

    `;

    let valores = [id_usuario];


    // Buscador por nombre o descripción
    if(filtros.buscar){

        sql += `
            AND (
                tareas.nombre LIKE ?
                OR tareas.descripcion LIKE ?
            )
        `;

        valores.push(
            `%${filtros.buscar}%`,
            `%${filtros.buscar}%`
        );
    }

    // Filtro categoría
    if(filtros.categoria){

        sql += `
            AND tareas.id_categoria = ?
        `;

        valores.push(filtros.categoria);
    }


    // Filtro prioridad
    if(filtros.prioridad){

        sql += `
            AND detalle_tarea.prioridad = ?
        `;

        valores.push(filtros.prioridad);
    }

        // Filtro estado
    if(filtros.estado){

        sql += `
            AND detalle_tarea.id_estado = ?
        `;

        valores.push(filtros.estado);
    }
    
    //Ordenar las tareas por fecha de creacion 
    sql += `
        ORDER BY tareas.fecha_creacion DESC
    `;


    const [rows] = await db.execute(sql, valores);

    return rows;
};


//Crear (le pasamos el objeto tarea)
export const crearTarea = async (tarea) => {
    
    const {
        nombre, descripcion, id_categoria, id_creador
    } = tarea;
   

    const sql = `INSERT INTO tareas (nombre, descripcion, id_categoria, id_creador) VALUES (?, ?, ?, ?)`;

    const [ resultado ] = await db.execute(sql, [nombre, descripcion, id_categoria, id_creador]); //guarda el resultado de la consulta en la variable resultado
    return resultado;
}

//Editar
export const editarTarea = async (id_tarea, tarea) => {

    const {
        nombre, 
        descripcion, 
        id_categoria,
    } = tarea;

    const sql =  `UPDATE tareas SET nombre = ?, descripcion = ?, id_categoria = ? WHERE id_tarea = ?`;

    const [ resultado ] = await db.execute(sql, [nombre, descripcion, id_categoria, id_tarea]);
    return resultado;
}

//Eliminar
export const eliminarTarea = async (id_tarea) => {
    const sql = `DELETE FROM tareas Where id_tarea = ?`;
    const [ resultado ] = await db.execute(sql, [id_tarea]);
    return resultado;
}

