
//Logica de negocio para el registro y login de usuarios

//Registro
export const registrar = async(req,res)=>{

    try{

        const {
            nombre,
            apellido,
            email,
            password
        } = req.body;



        const existe = await buscarPorEmail(email);


        if(existe){

            return res.status(400).json({
                mensaje:"El usuario ya existe"
            });

        }



        await crearUsuario({
            nombre,
            apellido,
            email,
            password
        });



        res.json({
            mensaje:"Usuario registrado correctamente"
        });



    }catch(error){

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

            return res.status(404).send("Usuario no encontrado");

        }


        if(usuario.password !== password){

            return res.status(401).send("Contraseña incorrecta");

        }

        //Guardar el usuario en la sesión
        req.session.usuario = {
            id_usuario: usuario.id_usuario,
            nombre: usuario.nombre,
            email: usuario.email
        };


        res.redirect("/tareas");


    }catch(error){

        console.log(error);

        res.status(500).send("Error del servidor");

    }

};