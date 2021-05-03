import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'

@Entity('users')
class User{
    
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    cpfCnpj: string

    @Column()
    email: string

    @Column()
    address: string

    @Column()
    cep: string

    @Column()
    password: string

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    constructor(){
        if(!this.id){
            this.id = uuid()
        }
    }
}

export { User }