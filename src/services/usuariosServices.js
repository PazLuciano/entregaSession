const userModel = require("../models/usuariosModel");

class UsuarioManager {
    async agregarUsuario(usuario) {
        // validar usuario
        try {
            // console.log("TODAVIAN O LLEGA ACA");
            const user = await userModel.create(usuario);
            
            return 1
        } catch (error) {
            console.log(error.message);S
            // console.log(typeof(error.message));
            if(error.message.includes("duplicate key")){
                return 0
            }
        }
    }
    async getUserByMail(mail){
        try {
           const user = await userModel.find({mail : mail})
           return user
        } catch (error) {
            console.log("serviceUser23", error.message);
        }
    }
}


module.exports = UsuarioManager