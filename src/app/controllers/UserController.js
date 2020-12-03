const User = require('../models/User')
const {formatCep, formatCpfCnpj} = require('../lib/utils')
const user = require('../validators/user')

module.exports = {
    registerForm (req, res){
        return res.render('user/register')
    },

    async post(req, res){
        const userId = await User.create(req.body)
        console.log(req.sessio)
        req.session.userId = 5

        return res.redirect('users/')
    },

    async show(req, res){
        const {user} = req

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)


        return res.render('user/index', {user})
    },

    async update(req, res){
        try {

            let {name, email, cpf_cnpj, cep, address} = req.body

            cpf_cnpj = cpf_cnpj.replace(/\D/g, '')
            cep = cep.replace(/\D/g, '')

            await User.update(user.id, {
                name,
                email,
                cpf,
                cpf_cnpj,
                cep,
                address
            })

            return res.render('user/index', {
                user: rq.body,
                sucess: 'Conta atualizada com sucesso!'
            })
            
        } catch (error) {
            console.error(error)
            
            return res.render('user/index', {
                error: 'Algum erro aconteceu'
            })
        }

    },

    async delete(req, res){
        try {
            await User.delete(1)

            req.session.destroy()

            return res.render('session/login', {
                sucess: 'Conta deletada com sucesso!'
            })
            
        } catch (error) {
            console.error(error)
            return res.render('user/index', {
                error: 'Erro ao tentar deletar sua conta'
            })
        }
    }
}