
//Logica de negocio para el registro y login de usuarios
import { crearUsuario, buscarPorEmail } from "../Models/usuario.model.js";
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
            mensaje: "El correo ya está registrado."
            });

        }
        //confirmar el pasword
        if(password !== confirmPassword){
        return res.render("login/registro", {
        mensaje: "Las contraseñas no coinciden"
        });

}

        await crearUsuario({
            nombre,
            apellido,
            email,
            password
        });

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
                mensaje: "Usuario no encontrado."
            });
        }


        if(usuario.password !== password){

            return res.render("login/login", {
                mensaje: "Contraseña o email incorrecto."
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