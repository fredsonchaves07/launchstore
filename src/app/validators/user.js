const User = require('../models/User')

async function post(req, res, next){
    //Verifica se todos os campos estão preenchidos
    const keys = Object.keys(req.body)

    for(key of keys){
        if(req.body[key] == ''){
            return res.send('Please, fill all fields')
        }
    }
    
    const {email, cpf_cnpj, password, passwordRepeat} = req.body
    cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
            
    //Verifica se o password é o mesmo
    if(password != passwordRepeat){
        return res.send('Password mismatch')
    }
    
    //Verifica se já existe um usuário
    user = await User.findUser({email, cpf_cnpj})
    
    if(user){
        return res.send('Users exists')
    }

    next()
}

module.exports = {
    post
}