import db from "../config/db.js"


//Obtener/mostrar
//Obtener una tarea por id
export const obtenerTareaPorId = async (id_tarea) => {
    const sql = `SELECT * from tareas where id_tarea = ?`;

    const [rows] = await db.execute(sql, [id_tarea]);
    return rows[0]; //retorna la primera fila del resultado de la consulta, que es la tarea con el id especificado.
}
//Obtener todas las tareas de un usuario
export const obtenerMisTareas = async (id_usuario) => {
    const sql = `SELECT * FROM tareas WHERE id_creador = ? ORDER BY nombre`; //consulta sql para obtener todas las tareas de un usuario, ordenadas por nombre.

    const [ rows ] = await db.execute(sql, [id_usuario]);
    return rows;
}

//Obtener tareas compartidas 

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
        nombre, descripcion, id_categoria, id_creador
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