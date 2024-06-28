import { Book } from "src/book/entities/book.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Rate } from "src/rate/entities/rate.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({nullable: true})
    about: string;

    @OneToMany(() => Book, (book) => book.author)
    books: Book[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];

    @OneToMany(() => Rate, (rate) => rate.user)
    rates: Rate[];
}