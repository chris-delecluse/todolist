import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Tasks {
    @ObjectIdColumn()
    id!: ObjectID

    @Column()
    task!: string

    @Column({default: false})
    done?: boolean

    @ObjectIdColumn()
    userId?: ObjectID
}
