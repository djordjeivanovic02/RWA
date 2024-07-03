export class CreateBookDto {
    id: number;
    title: string;
    author_id: number;
    image: string;
    description: string;
    created_at: Date;
    document: string;
    language: string;
    downloads: number;
    rate: number;
    genre: string;
}