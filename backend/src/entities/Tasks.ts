import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Tasks {
    @PrimaryGeneratedColumn("uuid")
    id?: string;

    @Column()
    task?: string

    @Column({default: false})
    done?: boolean

    @ManyToOne(() => User, user => user.tasks)
    user?: User;
}
