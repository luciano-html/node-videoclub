import express from "express"
const routerUsuarios = express.Router()
import controller from "../controllers/usuarios.controllers.js"

routerUsuarios.get("/signup", controller.showAuthFormSignUp)
routerUsuarios.post("/signup", controller.signup)

routerUsuarios.get("/signin", controller.showAuthFormSignIn)
routerUsuarios.post("/signin", controller.signin) 

routerUsuarios.get("/logout", controller.logout)

export default routerUsuarios