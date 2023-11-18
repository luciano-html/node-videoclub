import mongoose from "mongoose";

//El esquema es la estructura de mi documento mongo

const peliculasSchema = mongoose.Schema(
    {
        title:{
            type: String,
            require: true
        },
        year:{
            type: String,
            require: true
        }
    }
)

//Model (a partir del esquema)

const peliculasModelo = mongoose.model("peliculas", peliculasSchema)

//Metodos de interaccion con la base de datos

async function obtenerTodasLasPeliculas(){
    try {
        const peliculas = await peliculasModelo.find({}).lean()
        return peliculas
    } catch (error) {
        console.error(`Error en metodo de lectura de peliculas: [obtenerTodasLasPeliculas]`);
    }
}

async function obtenerPeliculaPorId(id){
    try {
        const pelicula = await peliculasModelo.findById(id).lean()
        return pelicula
    } catch (error) {
        console.error(`Error en metodo de lectura de peliculas: [obtenerPeliculaPorId]`)
        return null
    }
}

async function guardarPelicula (nuevaPelicula){
    try {

        let pelicula = new peliculasModelo(nuevaPelicula)
        pelicula = await pelicula.save() // Si la película no se crea, me devuelve null
        //console.log(pelicula)
        return pelicula
        
    } catch (error) {
        console.log('ERROR al guardar la película', error)
        return null
    }
}

async function actualizarPelicula(id, peliculaEditada){

    try {
        const pelicula = await peliculasModelo.findByIdAndUpdate(id, peliculaEditada)
        return pelicula
    } catch (error) {
        console.log('[actualizarPelicula]: Error al querer actualizar la película', error)
        return null
    }
}

async function eliminarPelicula(id){
    try {
        const pelicula = await peliculasModelo.findById(id)
        const peliculaEliminada = await pelicula.deleteOne({pelicula})
        
        return peliculaEliminada

    } catch (error) {
        console.log(`[eliminarPelicula]:Error al intentar eliminar pelicula`);
        return null
    }
}
export default {
    obtenerTodasLasPeliculas,
    obtenerPeliculaPorId,
    guardarPelicula,
    actualizarPelicula,
    eliminarPelicula
}
