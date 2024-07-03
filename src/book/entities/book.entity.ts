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

    @Column({ type: 'int', default: 0 })
    downloads: number;
    
    @Column()
    genre: string;

    @Column({nullable: true})
    image: string;

    @Column({nullable: true})
    document: string;

    @Column({nullable: true})
    language: string;

    @ManyToOne(() => User, (user) => user.books, { eager: true})
    author: User;

    @OneToMany(() => Comment, (comment) => comment.book, { eager: true})
    comments: Comment[];

    @OneToMany(() => Rate, (rate) => rate.book, { eager: true})
    rates: Rate[];

    @OneToMany(() => BookList, (bookList) => bookList.book, { eager: true})
    lists: BookList[];
}
