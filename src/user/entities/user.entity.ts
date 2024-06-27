
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string

    @Column()
    surname: string

    @Column({ unique: true })
    email: string

    @Column()
    password: string

    // @OneToMany(() => Book, (book) => book.author)
    // books: Book[]
}