import { Book } from "./book";
import { User } from "./user";

export interface Rate{
    id: number;
    rate: number;
    user: User;
    book: Book;
}