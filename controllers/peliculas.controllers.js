import modelo from "../models/peliculas.model.js"

async function listarPeliculas(req, res) {

    try {
        const peliculas = await modelo.obtenerTodasLasPeliculas()
        const data = {peliculas}
        console.log(peliculas);

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

    const nuevaPelicula = {
        title: req.body.title,
        year: req.body.year
    }

    const peliculaCreada = await modelo.guardarPelicula(nuevaPelicula)
    console.log(peliculaCreada);
    

    if (!peliculaCreada) {
        return res.status(400).send(`Algo falló al crear la película`)
    }

    res.status(201).send(`Pelicula creada: ${
        req.body.title
    }, ${
        req.body.year
    }`)
}

function formularioEdicionPelicula(req, res) {
    res.status(200).render("peliculas/edit")
}

function actualizarPelicula(req, res) {
    res.send("UPDATE")
}

function eliminarPelicula(req, res) {
    res.send("DELETE")
}


export default {listarPeliculas, formularioCreacionPeliculas, obtenerPeliculaPorId, crearUnaPelicula, formularioEdicionPelicula, actualizarPelicula, eliminarPelicula}
