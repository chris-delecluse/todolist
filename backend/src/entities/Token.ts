import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Token {
    @ObjectIdColumn()
    id!: ObjectID

    @Column()
    token!: string

    @Column()
    expires!: number

    @Column({default: false})
    isRevoked!: boolean

    @ObjectIdColumn()
    userId!: ObjectID
}
