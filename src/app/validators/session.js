const User = require('../models/User')
const {compare} = require('bcryptjs')


async function login(req, res, next){
    const {email, password} = req.body

    const user = await User.findUser(id)

    if(!user){
        return render('session/login', {
            user: req.body,
            error: 'Usuário não cadastrado'
        })
    }

    const passed = await compare(password, user.password)

    if(!passed){
        return res.reder('session/login'), {
            error: 'Senha incorreta'
        }
    }

    req.user = user

    next()
}

async function forgot(req, res, next){
    const {email} = req.body
    
   try {
       let user = await User.findUser(email)

       
        if(!user){
            return render('session/forgot-password', {
                user: req.body,
                error: 'Email não cadastrado'
            })
        }

        req.user = user

        next()

   } catch (error) {
       console.error(error)
   }
}

module.exports = {
    login,
    forgot
}