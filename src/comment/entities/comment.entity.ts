import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, user => user.comments, { eager: true})
    user: User

    @ManyToOne(() => Book, (book) => book.description, {onDelete: 'CASCADE'})
    book: Book
}