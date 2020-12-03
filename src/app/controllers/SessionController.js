const User = require('../models/User')
const crypto = require('crypto')
const mailer = require('../lib/mailer')

module.exports = {
    loginForm(req, res){
        return res.render('session/login')
    },
    
    logout(req, res){
        req.session.destroy()

        return res.redirect('/')
    },

    login(req, res){
        req.session.userId = req.user.userId
        
        return res.redirect('/users')
    },

    forgotForm(req, res){
        return res.render('session/forgot-password')
    },

    async forgot(req, res){
        try {
            const user = req.user

            // Um token para esse usuário
            const token = crypto.randomBytes(20).toString('hex')

            // Criar uma expiração
            let now = new Date()
            now = now.setHours(now.getHours + 1)

            await User.update(user.id, {
                reset_token: token,
                reset_token_expires: now
            })

            // Enviar um email com o link de recuperação de senha
            await mailer.sendMail({
                to: user.email,
                from: 'no-reply@lauchstore.com.br',
                subject: 'Recuperação de senha',
                html: `
                    <h2>Perdeu a chave?</h2>
                    <p>Clique no link abaixo para recuperar a senha</p>
                    <p>
                        <a href="http://localhost:3000/users/password-reset?token=${token} target="_blank"">
                            Recuperar senha
                        </a>
                    </p>
                `
            })

            // Avisar o usuário que enviamos o email
            return res.render('session/forgot-password', {
                sucess: 'Verifique o seu email para redefinir a senha'
            })
        } catch (error) {
            console.error(error)
            res.render("session/forgot-password", {
                error: 'Erro inesperado. Tente novamente!'
            })
        }
    },

    resetForm(req, res){
        return res.render('session/password-reset', {token: req.query.token})
    },

    reset(req, res){
        const {email, password, passwordRepeat, token} = req.body

        try {
            
        } catch (error) {
            console.error(error)
            
            return res.render('session/password-reset', {
                error: 'Erro inesperado, Tente novamente!'
            })
        }
    }
}