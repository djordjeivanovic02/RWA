import { BookList } from "src/booklist/entities/booklist.entity";
import { Comment } from "src/comment/entities/comment.entity";
import { Rate } from "src/rate/entities/rate.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Book {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @Column()
    format: string;

    @Column({ type: 'int', default: 0 })
    downloads: number;
    
    @Column()
    genre: string;

    @ManyToOne(() => User, (user) => user.books)
    author: User;

    @OneToMany(() => Comment, (comment) => comment.book)
    comments: Comment[];

    @OneToMany(() => Rate, (rate) => rate.book)
    rates: Rate[];

    @OneToMany(() => BookList, (bookList) => bookList.book)
    lists: BookList[];
}
