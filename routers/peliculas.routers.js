import express from "express"
import controller from "../controllers/peliculas.controllers.js"

const routerPeliculas = express.Router()
// GET ALL
routerPeliculas.get('/', controller.listarPeliculas)
// FORMULARIO DE CREACION
routerPeliculas.get('/create',controller.formularioCreacionPeliculas)
// GET ONE
routerPeliculas.get('/:id',controller.obtenerPeliculaPorId)

routerPeliculas.post('/', controller.crearUnaPelicula)

// FORMULARIO DE EDICION
routerPeliculas.get('/edit/:id',controller.formularioEdicionPelicula)

routerPeliculas.put('/:id', controller.actualizarPelicula)

routerPeliculas.delete('/:id', controller.eliminarPelicula)

export default routerPeliculas
