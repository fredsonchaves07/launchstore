const User = require('../models/User')
const {compare} = require('bcryptjs')

function checkAllFieds(body){
    const keys = Object.keys(body)

    for(key of keys){
        if(body[key] == ''){
            return {
                user: req.body,
                error: 'Por favor, preencha todos os campos',
            }
        }
    }
}


async function show(req, res, next){
    const user = await User.findUser(id)

    if(!user){
        return render('user/register', {
            error: 'Usuário não encontrado'
        })
    }

    req.user = user

    next()
}

async function post(req, res, next){
    const fillAllFields = checkAllFieds(req.body)

    if(fillAllFields){
        return res.render('user/register', fillAllFields)
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

async function update(req, res, next){
    const fillAllFields = checkAllFieds(req.body)

    if(fillAllFields){
        return res.render('user/index', fillAllFields)
    }

    const {id, password} = req.body

    if(!password){
        return res.render('user/index', {
            user:req.body,
            error: 'Coloque sua senha para atualizar seu cadastro'
        })
    }

    // TODO: Verificar forma como está sendo enviado 
    const user = await User.findUser()

    const passed = await compare(password, user.password)

    if(!passed){
        return res.reder('user/index'), {
            error: 'Senha incorreta'
        }
    }

    next()
}


module.exports = {
    post, show, update
}