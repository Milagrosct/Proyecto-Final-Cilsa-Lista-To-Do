//Funcion que se ejecuta antes de llegar al controlador, valida el token y obtiene el usuario logueado
//el usuario inicia sesion y el servidor guarda esa informacion 

/*  1 Revisar si existe una sesión.
    2 Ver si hay un usuario guardado.
    3 Si existe → dejar pasar.
    4 Si no existe → bloquear. */

export const authMiddleware = (req,res,next)=>{

    if(!req.session.usuario){
        return res.redirect("/usuarios/login");
    }

    next();

}
