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

const guardarPelicula = async (nuevaPelicula) => {
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

export default {
    obtenerTodasLasPeliculas,
    guardarPelicula
}
