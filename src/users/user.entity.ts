/* eslint-disable prettier/prettier */
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    email: string

    @Column()
    first_name: string

    
    @Column()
    last_name: string

    
    @Column({
        nullable: true
    })
    avatar: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}