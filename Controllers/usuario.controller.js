
//Logica de negocio para el registro y login de usuarios
import { crearUsuario, buscarPorEmail } from "../Models/usuario.model.js";
import bcrypt from "bcrypt"; // para incriptar la contraseña
//Registro
export const registrar = async(req,res)=>{

    try{
        console.log(req.body);
        const {
            nombre,
            apellido,
            email,
            password,
            confirmPassword

        } = req.body;



        const existe = await buscarPorEmail(email);


        if(existe){

    return res.render("login/registro", {
        mensaje: "El correo ya está registrado.",
        success: null
    });

}


if(password !== confirmPassword){

    return res.render("login/registro", {
        mensaje: "Las contraseñas no coinciden",
        success: null
    });

}

// Encriptar contraseña
const passwordEncriptada = await bcrypt.hash(password, 10);

        await crearUsuario({
            nombre,
            apellido,
            email,
            password: passwordEncriptada
        });

        req.session.success = "Usuario registrado correctamente.";
        return res.redirect("/usuarios/login")
            
     



    }catch(error){


        console.log("ERROR REGISTRO:");
        console.log(error);
        
        res.status(500).json({
            mensaje:"Error del servidor"
        });

    }

};

//Inicio de sesion
export const login = async(req,res)=>{

    try{

        const { email, password } = req.body;


        const usuario = await buscarPorEmail(email);


       if(!usuario){

    return res.render("login/login", {
        mensaje: "Usuario no encontrado.",
        success: null
    });
}


    const coincide = await bcrypt.compare(
    password,
    usuario.password
);

    if(!coincide){

        return res.render("login/login", {
            mensaje: "Contraseña o email incorrecto.",
            success: null
        });

}

        //Crear la sesion
        req.session.usuario = {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email
        };

        
        res.redirect("/tareas");


    }catch(error){

        
        console.log(error);

        res.status(500).json({
        mensaje:"Error del servidor"
        });

    }

};

//cerrar sesion 
export const logout = (req, res) => {

    req.session.destroy((error)=>{

        if(error){
            console.log(error);

            return res.status(500).json({
                mensaje: "Error al cerrar sesión"
            });
        }


        res.redirect("/usuarios/login");

    });

};