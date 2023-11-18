import express from "express"
import controller from "../controllers/peliculas.controllers.js"
import isAuthenticated from "../middlewares/usuarios.middleware.js"

const routerPeliculas = express.Router()
// GET ALL
routerPeliculas.get('/', isAuthenticated, controller.listarPeliculas)
// FORMULARIO DE CREACION
routerPeliculas.get('/create', controller.formularioCreacionPeliculas)
// GET ONE
routerPeliculas.get('/:id', controller.obtenerPeliculaPorId)

routerPeliculas.post('/', controller.crearUnaPelicula)

// FORMULARIO DE EDICION
routerPeliculas.get('/edit/:id', controller.formularioEdicionPelicula)

routerPeliculas.put('/:id', controller.actualizarPelicula)

routerPeliculas.delete('/:id', controller.eliminarPelicula)

export default routerPeliculas
