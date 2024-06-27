import { Book } from "src/book/entities/book.entity";
import { User } from "src/user/entities/user.entity";

export class CommentDto{
    id: number;
    content: string;
    user: User;
    book: Book;
    created_at: Date;
}