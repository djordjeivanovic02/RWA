import { Book } from "./book.interface";
import { User } from "./user.interface";

export interface BookList{
    id: number;
    type: 'to_read' | 'readed';
    user: User;
    book: Book;
    date: Date;
}