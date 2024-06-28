
export class CreateBookListDto{
    id: number;
    type: 'to_read' | 'readed';
    user_id: number;
    book_id: number;
    date: Date;
}