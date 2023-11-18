import {model} from "mongoose";
import modelo from "../models/peliculas.model.js"
import {mongoToObj} from "../utils/mongo-to-obj.js";

async function listarPeliculas(req, res) {

    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas()
        const data = {peliculas}


        res.status(200).render("index", data)
    } catch (error) {
        console.error(`Error en controlador al traer peliculas [listarPeliculas]:`, error);
        res.status(500).send(`Error en controlador al traer peliculas [listarPeliculas]: ${error}`)
    }

}

function formularioCreacionPeliculas(req, res) {
    res.status(200).render("peliculas/create")
}

function obtenerPeliculaPorId(req, res) {
    res.status(200).send("READ ONE: GET ONE")
}

async function crearUnaPelicula(req, res) {

    const nuevaPelicula = {title: req.body.title, year: req.body.year}

    const peliculaCreada = await modelo.guardarPelicula(nuevaPelicula)

    console.log(peliculaCreada);


    if (! peliculaCreada) {
        return res.status(400).send(`Algo falló al crear la película`)
    }

    res.status(201).render(`peliculas/show`, {pelicula: mongoToObj(peliculaCreada)})
}

async function formularioEdicionPelicula(req, res) {
    const {id} = req.params
    try {
        const pelicula = await modelo.obtenerPeliculaPorId(id)

        if (! pelicula) {
            return req.status(400).send("Pelicula no encontrada")
        }
        const {title, year, _id} = pelicula
        res.status(200).render("peliculas/edit",{title,year,_id})
    } catch (error) {
        console.log(`Error en edicion`,error);
        res.status(500).send("Algo no salio bien en la carga del formulario de edicion")
    }
}

async function actualizarPelicula(req, res) {
    const { id } = req.params
    const pelicula = req.body

    try {
        const peliculaEditada = await modelo.actualizarPelicula(id, pelicula)

        if ( !peliculaEditada ) {
            return res.status(400).send('No se encontró la película')
        }

        res.redirect('/api/peliculas')
    } catch (error) {
        console.log('Error al querer editar la película', error)
        res.status(500).send('Error al querer editar la película', error)
    }
}

async function eliminarPelicula(req, res) {
    
    const peliculaId = req.params.id
    console.log(peliculaId)
    try {
        const peliculaEliminada = await modelo.eliminarPelicula(peliculaId)

        if (peliculaEliminada){
            return res.status(200).send(`Pelicula eliminada : ${peliculaId} `)
        }

    } catch (error) {
        console.log(`Error al eliminar pelicula (peliculas.controller.js): ${error}`);
        res.status(500).send(`Error al eliminar pelicula (peliculas.controller.js: ${error})`)
    }
}


export default {listarPeliculas, formularioCreacionPeliculas, obtenerPeliculaPorId, crearUnaPelicula, formularioEdicionPelicula, actualizarPelicula, eliminarPelicula}
