const db = require('../config/db')

module.exports = {
    async findUser(data){
        let email, cpf_cnpj

        if(data.email){
            const query = `
                SELECT * FROM users
                WHERE email = '${data.email}'
            `

            email = await db.query(query).rows
        }

        if(data.cpf_cnpj){
            const query = `
                SELECT * FROM users
                WHERE cpf_cnpj = '${data.cpf_cnpj}'
            `

            cpf_cnpj = await db.query(query).rows
        }

        return email || cpf_cnpj
    },
}