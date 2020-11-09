const db = require('../config/db')
const {hash} = require('bcryptjs')
// Biblioteca utilizada para realizar o encript de senha
const { has } = require('browser-sync')

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

    async create(data){
        const query = `
            INSERT INTO users (
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        // Criptografia de senha
        const passwordHash = await hash(data.password, 8)
    
        const values = [
            data.name,
            data.email,
            passwordHash,
            data.cpf_cnpj.replace(/\D/g, ""),
            data.cep.replace(/\D/g, ""),
            data.address
        ]

        const results = await db.query(query, values)
        return results.rows[0].id
    },

    async update(id, fields){
        let query = 'UPDATE users SET'

        Object.keys(fields).map((key, index, array) => {
            if((index + 1) < array.length){
                query = `${query} ${key} = '${fields[key]}'`
            } else {
                query = `${query} ${key} WHERE id = '${id}'`
            }
        })
    }
}