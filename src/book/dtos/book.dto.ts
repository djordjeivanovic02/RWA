import { User } from "src/user/entities/user.entity";

export class BookDto {
    id: number;
    title: string;
    author: User;
    description: string;
    created_at: Date;
    format: string;
    downloads: number;
    rate: number;
    genre: string;
}