import {Column, Entity, ObjectID, ObjectIdColumn} from "typeorm";

@Entity()
export class Token {
    @ObjectIdColumn()
    id!: ObjectID

    @Column()
    accessToken!: string

    @Column()
    refreshToken!: string

    @Column()
    refreshTokenExpires!: number | string

    @ObjectIdColumn()
    userId!: ObjectID

    // client_IP a mettre plus tard :).
}
