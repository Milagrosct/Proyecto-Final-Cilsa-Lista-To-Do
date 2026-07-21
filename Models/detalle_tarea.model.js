import db from "../config/db.js";

export const crearDetalleTarea = async (detalle) => {

    const {
        id_usuario,
        id_tarea,
        id_estado,
        prioridad,
        fecha_inicio,
        fecha_vencimiento
    } = detalle;

    const inicio = fecha_inicio || null;
    const vencimiento = fecha_vencimiento || null;

    const sql = `
        INSERT INTO detalle_tarea (
            id_usuario,
            id_tarea,
            id_estado,
            prioridad,
            fecha_inicio,
            fecha_vencimiento
        )
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const [resultado] = await db.execute(sql, [
        id_usuario,
        id_tarea,
        id_estado,
        prioridad,
        inicio,
        vencimiento
    ]);

    return resultado;
};

//Editar
export const editarDetalleTarea = async (id_tarea, detalle)=>{
    const {
        prioridad,
        fecha_inicio,
        fecha_vencimiento
    } = detalle;

    const inicio = fecha_inicio || null;
    const vencimiento = fecha_vencimiento || null;

    const sql = `UPDATE detalle_tarea set prioridad = ?, fecha_inicio = ?, fecha_vencimiento = ? WHERE id_tarea = ?`;

    const [resultado] = await db.execute(sql, [
        prioridad, 
        inicio,
        vencimiento,
        id_tarea
    ]);
    return resultado;

}
//Editar el estado
export const cambiarEstadoTarea = async(id_tarea, id_estado)=>{
    
    let fecha_finalizacion = null;

    //si pasa a completado se guarda la fecha 
    if(id_estado == 3) {
        fecha_finalizacion = new Date();
    }
    const sql = `UPDATE detalle_tarea
                SET id_estado = ?,
                fecha_finalizacion = ?
                WHERE id_tarea = ? 
                `
    const [resultado] = await db.execute(sql, [
        id_estado,
        fecha_finalizacion,
        id_tarea
    ]);

    return resultado;
}

//Eliminar
export const eliminarDetalleTarea = async (id_tarea)=>{
    const sql = `DELETE FROM detalle_tarea WHERE id_tarea = ?`;

    const [resultado] = await db.execute(sql, [id_tarea]);
    return resultado;
}

export const obtenerDetalleTarea = async(id_tarea)=>{

    const sql = `
    SELECT *
    FROM detalle_tarea
    WHERE id_tarea = ?
    LIMIT 1
    `;

    const [rows] = await db.execute(sql,[id_tarea]);

    return rows[0];

}