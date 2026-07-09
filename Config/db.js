import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

//Esto permite guardar los datos de la conexion a la base de datos, los verdaderos datos estan en .env
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


try {
    await connection.getConnection();
    console.log("✅ Base de datos conectada correctamente");
} catch (error) {
    console.error("❌ Error al conectar con MySQL:", error.message);
}


export default connection;