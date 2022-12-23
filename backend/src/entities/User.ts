import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Tasks }                                             from "./Tasks";

@Entity()
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    firstName!: string;

    @Column()
    lastName!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @OneToMany(() => Tasks, task => task.user)
    tasks?: Tasks[];
}
