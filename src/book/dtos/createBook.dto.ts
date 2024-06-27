export class CreateBookDto {
    id: number;
    title: string;
    author_id: number;
    description: string;
    created_at: Date;
    format: string;
    downloads: number;
    rate: number;
    genre: string;
}