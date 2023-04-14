/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string 

    @Column()
    first_name: string

    
    @Column()
    last_name: string

    
    @Column()
    avatar: string

    
    @Column()
    created_at: Date

    @Column()
    updated_at: Date

    @Column()
    deleted_at: Date
}