import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @Column({ type: 'int', default: 0 })
    rate: number;

    @Column()
    genre: string;

    @ManyToOne(() => User, (user) => user.books)
    author: User;
}
