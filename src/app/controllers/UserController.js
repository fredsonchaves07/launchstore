const User = require('../models/User')
const {formatCep, formatCpfCnpj} = require('../lib/utils')

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
        const {userId: id} = req.session

        const user = await User.findUser(id)

        if(!user){
            return render('user/register', {
                error: 'Usuário não encontrado'
            })
        }

        user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
        user.cep = formatCep(user.cep)


        return res.render('user/index', {user})
    }
}