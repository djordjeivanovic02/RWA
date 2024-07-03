import { User } from "src/user/entities/user.entity";

export class BookDto {
    id: number;
    title: string;
    author: User;
    image: String;
    description: string;
    created_at: Date;
    document: string;
    language: string;
    downloads: number;
    rate: number;
    genre: string;
}