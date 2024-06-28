import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class BookList {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.lists)
    user: User;

    @ManyToOne(() => Book, (book) => book.lists)
    book: Book;

    @Column({ type: 'enum', enum: ['to_read', 'readed'] })
    type: 'to_read' | 'readed';

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;
}