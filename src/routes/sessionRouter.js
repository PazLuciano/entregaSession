const { Router } = require("express");
const UsuarioManager = require("../services/usuariosServices");

const router = Router();
const manager = new UsuarioManager()


router.post("/registrarse", async (req, res) => {
    try {
        const { nombre, apellido, mail, edad, password } = req.body;
        const user = { nombre, apellido, mail, edad, password };
        console.log(user);
        const usuario = await manager.agregarUsuario(user)
        // console.log(usuario);
        if(usuario == 1){
            console.log();
            return res.redirect("/api/v1/views/login")
        } 
        if(usuario == 0){
            return res.json({
                ok : false, 
                message: "User already registered"
            })
        } 
    } catch (error) {
        console.log("15-session", error.message);
    }
})

router.post("/login", async (req, res) =>{
    try {
        if(req.session?.user){
            console.log("aca?");
            return res.render("pagemain")
        }
        const { mail, contraseña } = req.body;
        const session = req.session;
        const findUser = await manager.getUserByMail(mail)
        if (!findUser[0]) {
          return res.json({ message: `este usuario no esta registrado` });
        }
    
        if (findUser[0].password != contraseña) {
          return res.json({ message: `password incorrecto` });
        }

        req.session.user = {
          ...findUser[0],
        };
        // const user = findUser[0]
        const user = req.session.user._doc;
        res.render("pagemain", { user: user })

    } catch (error) {
        console.log("sessionRouter 33", error.message);
    }
})

router.get("/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (!err) return res.redirect("/api/v1/views/login");
      return res.send({ message: `logout Error`, body: err });
    });
  });
  



module.exports = router
