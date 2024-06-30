import { User } from "./user";

export interface Book {
    id?: number;
    title?: string;
    author?: User;
    image?: string;
    description?: string;
    created_at?: Date;
    format?: string;
    downloads?: number;
    rate?: number;
    genre?: string;
}
