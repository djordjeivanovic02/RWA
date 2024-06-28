import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rate{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rate: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date;

    @ManyToOne(() => User, (user) => user.rates, { eager: true})
    user: User;

    @ManyToOne(() => Book, (book) => book.rates, { eager: true})
    book: Book;
}