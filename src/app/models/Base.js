const db = require('../config/db')

const Base = {
    init({table}){
        if(!table) throw new Error('Parâmetro inválido')

        this.table = table

        return thiss
    },

    async create(fields){
        try {
            let keys = [],
                values = []

            Object.keys(fields).map(key => {
                keys.push(key)
                values.push(fields[key])
            })

            const query = `
            INSERT INTO ${this.table} (${keys})
            VALUES (${values})
            RETURNING id
            `

            const results = await db.query(query)
            return results.rows[0].id
        } catch (error) {
            console.error(error)
        }
    },
    
    async update(id, fields){
        try {
            let update = []

            Object.keys(fields).map((key, index, array) => {
                const line = `${key} = '${fields[key]}'`
                update.push(line)
            })

            let query = `UPDATE ${this.table} SET`
            
        } catch (error) {
            console.error(error)
        }


    },
}

module.exports = Base