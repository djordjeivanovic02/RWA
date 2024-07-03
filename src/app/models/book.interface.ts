import { Rate } from "./rate.interface";
import { User } from "./user.interface";

export interface Book {
    id?: number;
    title?: string;
    author?: User;
    image?: string;
    description?: string;
    document?: string;
    created_at?: Date;
    format?: string;
    downloads?: number;
    rates?: Rate[];
    genre?: string;
    averageRate: number;
    language?: string;
}
