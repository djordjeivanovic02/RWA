import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

export class BookListDto{
    id: number;
    type: 'to_read' | 'readed';
    user: User;
    book: Book;
    date: Date;
}