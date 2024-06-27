import { Body, Controller, Post } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/createBook.dto';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post()
    create(@Body() book: CreateBookDto): Observable<Book>{
        return this.bookService.create(book);
    }
}
