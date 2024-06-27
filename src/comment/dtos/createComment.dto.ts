export class CreateCommentDto{
    id: number;
    content: string;
    user_id: number;
    book_id: number;
    created_at: Date;
}