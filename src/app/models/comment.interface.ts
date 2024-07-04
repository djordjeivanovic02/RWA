import { Book } from "./book.interface";
import { User } from "./user.interface";

export interface Comment{
    id: number;
    content: string;
    user: User;
    book: Book;
    created_at: Date;
}