import { Book } from "./book.interface";
import { User } from "./user.interface";

export interface Rate{
    id: number;
    rate: number;
    user: User;
    book: Book;
}