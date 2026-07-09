//Funcion que se ejecuta antes de llegar al controlador, valida el token y obtiene el usuario logueado
//el usuario inicia sesion y el servidor guarda esa informacion 

/*  1 Revisar si existe una sesión.
    2 Ver si hay un usuario guardado.
    3 Si existe → dejar pasar.
    4 Si no existe → bloquear. */

    export const authMiddleware = (req, res, next) => {
        //verificar si existe un usuario en la sesion
        if(!req.session.usuario) {
            return res.status(401).json({ //401 significa no autorizado
                mensaje: "Debe iniciar sesion para acceder."
            });
        }
        //si existe usuario 
        req.user = req.session.usuario; //obtiene el usuario logueado de la sesion y lo guarda en req.user para que pueda ser usado en el controlador

        //continuar al controlador
        next();
    };
