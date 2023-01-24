import { Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

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

	@Column()
	clientIp?: string

	@ObjectIdColumn()
	userId!: ObjectID
}
