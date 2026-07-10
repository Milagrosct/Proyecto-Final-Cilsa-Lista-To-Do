
//Crear consultas, manejo de datos con la base de datos, etc

import db from "../config/db.js";


/* Acá vamos a colocar funciones como:

-buscar usuario por email
-crear usuario
-obtener usuarios */


//crear usuario
export const crearUsuario = async (usuario) => {

    const {
        nombre,
        apellido,
        email,
        password
    } = usuario;


    const sql = `
        INSERT INTO usuarios
        (nombre, apellido, email, password)
        VALUES (?, ?, ?, ?)
    `;

    console.log("Llega al modelo:");
    console.log(usuario);
    const [resultado] = await db.execute(sql,[
        nombre,
        apellido,
        email,
        password
    ]);


    return resultado;

};


//buscar usuario x email
export const buscarPorEmail = async(email)=>{

    const sql = `
        SELECT *
        FROM usuarios
        WHERE email = ?
    `;


    const [usuario] = await db.execute(sql,[email]);


    return usuario[0];

};