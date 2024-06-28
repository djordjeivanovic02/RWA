import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

export class RateDto{
    id: number;
    rate: number;
    user: User;
    book: Book;
    created_at: Date;
}