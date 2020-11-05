const User = require('../models/User')

async function post(req, res, next){
    //Verifica se todos os campos estão preenchidos
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ''){
            return res.render('users/register', {
                user: req.body,
                error: 'Por favor, preencha todos os campos',
            })
        }
    }
    
    let {email, cpf_cnpj, password, passwordRepeat} = req.body
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            
    //Verifica se o password é o mesmo
    if(password != passwordRepeat){
        return res.render('users/register', {
            user: req.body,
            error: 'Senha não confere',
        })
    }
    
    //Verifica se já existe um usuário
    user = await User.findUser({email, cpf_cnpj})
    
    if(user){
        return res.render('users/register', {
            user: req.body,
            error: 'Usuário já cadastrado',
        })
    }

    next()
}

module.exports = {
    post
}