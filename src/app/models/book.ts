import { Rate } from "./rate";
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
    rates?: Rate[];
    genre?: string;
    averageRate: number
}
