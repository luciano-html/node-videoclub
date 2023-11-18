import mongoose, { mongo } from "mongoose";
import bcrypt from "bcrypt"

const UsuariosSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
            unique: true
        },
        password: {
            type: String,
            require: true
        }
    },
    {
        timestamps: true,
        versionKey: false
    })

    
    // METODOS
    UsuariosSchema.methods.encriptarPassword = async (password) => {
        const salt = await bcrypt.genSalt(10) // crea una semilla 
        return await bcrypt.hash(password, salt) // encripta password (uniderccional)
    }
    
    UsuariosSchema.methods.comprobarPassword = async function (password) {
        return await bcrypt.compare(password, this.password)
    }
    
    const UsuariosModelo = mongoose.model("usuarios", UsuariosSchema)

async function getUserByEmal(email) {
    try {
        const userFound = await UsuariosModelo.findOne({ email })
        return userFound
    } catch (error) {
        console.log(`Model Error: [getUserByEmail]`);
    }
}

async function createUser(newUser) {
    console.log(newUser);
    
    try {
        const userCreated = new UsuariosModelo(newUser) //traemos newUser = { name, email, password } 
        // Guardamos newUser.password encriptado en userCreated.password antes de pushear
        userCreated.password = await userCreated.encriptarPassword(newUser.password)
        await userCreated.save()
        return userCreated
    } catch (error) {
        console.log(`Model Error: [createUser]: ${error}`)
    }
}

async function checkUserPassword(usuario, password) {
    try {
        const isMatch = await usuario.comprobarPassword(password)
        return isMatch
    } catch (error) {
        console.log(`Error en el modelo: [checkUserPassword]: ${error}`)
        throw error
    }
}

async function getUserById(id) {
    try {
        const user = await UsuariosModelo.findById({ id })
        return user
    } catch (error) {
        console.log(`Model Error: [getUserByEmail]: ${error}`)
    }
}

export default {
    getUserByEmal, getUserById, createUser, checkUserPassword
}