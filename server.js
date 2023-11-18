import express from 'express'
import 'dotenv/config'
import path from "node:path"
import mongoose from "mongoose"
import { engine } from 'express-handlebars'
import methodOverride from 'method-override'
import session from 'express-session'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import * as passportStrategy from "./config/passport.js"

import routerPeliculas from './routers/peliculas.routers.js'
import routerUsuarios from './routers/usuarios.router.js'


//! CONFIGURACIONES
const app = express()
const port = process.env.PORT || 3000

//! EXPRESS HANDLEBARS
app.engine("hbs", engine({ defaultLayout: "main", extname: ".hbs" }))
app.set("view engine", "hbs")
app.set("views", path.join(".", path.sep, "views"))



// ! MIDDLEWARES
app.use(express.static("public"))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(methodOverride('_method'))

app.use(session({
    secret: process.env.SESSION_SECRET ,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.URI_DB_LOCAL })
}))
app.use(passport.initialize())
app.use(passport.session())


app.use("/api/peliculas", routerPeliculas)
app.use("/auth", routerUsuarios)


// ! CONEXION BASE DE DATOS
async function connectDb() {
    try {
        await mongoose.connect(process.env.URI_DB_LOCAL)
        console.log('Conexion a la base de datos exitosa');

    } catch (error) {
        console.log(`Error al conectar a la base de datos`, error);
    }
}
connectDb()

app.listen(port, () => {
    console.log(`Servidor Corriendo http://localhost:${port}/`)
})


// 1.45.45