import { model } from "mongoose"
import models from "../models/usuarios.model.js"
import passport from "passport"



function showAuthFormSignUp(req, res) {
    res.render("usuarios/signup")
}

function showAuthFormSignIn(req, res) {
    res.render("usuarios/signin")
}

async function signup(req, res) {

    try {
        const errors = []
        const { name, email, password, confirm_password } = req.body

        if (password !== confirm_password) {
            errors.push({ msg: "La contraseña no coincide" })
        }

        if (password.length < 5) {
            errors.push({ msg: "La contraseña debe tener al menos 5 caracteres" })
        }

        if (errors.length > 0) {
            return res.send(`Hay errores ${errors}`)
        }

        const userFound = await models.getUserByEmal(email)

        if (userFound) {
            return res.send("Ya existe este usuario")
        }

        const newUser = await models.createUser({ name, email, password })

        if (!newUser) {
            return res.send("No se pudo crear el usuario")
        } else {
            res.send("Usuario creado")
        }


    } catch (error) {
        res.status(500).send(`Controller Error: Error al crear usuario`)
    }
}

const signin = passport.authenticate('local',{
    successRedirect: '/api/peliculas',
    failureRedirect: '/auth/signin'
})


function logout(req, res) {
    res.send("Se deslogeo")
}

export default {
    showAuthFormSignIn, showAuthFormSignUp, signin, signup, logout
}