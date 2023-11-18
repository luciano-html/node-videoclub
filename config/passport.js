import passport from 'passport'
import { Strategy } from 'passport-local'
import model from '../models/usuarios.model.js'

// Strategy('<field>', callback) // passport-local

// primer argumento ( obj del field )
const fieldEstrategia = { usernameField: 'email' }

// segundo argumento (callback)
const comprobacionUsuario = async (email, password, done) => {

    try {
        
        const usuario = await model.getUserByEmal(email)
        
        
        if ( !usuario ) { // <= Si no hay usuario
            return done(null, false, {message: 'Usuario no encontrado'})
        }

        const passwordCorrecto = await model.checkUserPassword(usuario, password);

        if ( !passwordCorrecto ) {
            return done(null, false, {message: 'No coincide el password'})
        }

        return done(null, usuario)

    } catch (error) {
        console.log('[comprobacionUsuario]:', error)
    } 
}

const estrategiaLocal = new Strategy(fieldEstrategia, comprobacionUsuario)

export default passport.use(estrategiaLocal)

passport.serializeUser((usuario, done) => {
    done(null, usuario.id)
})

passport.deserializeUser( async (id, done) => {
    const usuario = await model.getUserByEmal(id)
    done(null, usuario)
})