import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/createBook.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post()
    create(@Body() book: CreateBookDto): Observable<Book>{
        return this.bookService.create(book);
    }

    @Get()
    getAll():Observable<Book[]>{
        return this.bookService.getAllBooks()
    }

    @Get(':id')
    getBook(
        @Param('id') id: number
    ): Observable<Book>{
        return this.bookService.getBook(id);1
    }

    @Put(':id')
    updateBook(
        @Param('id') id: number,
        @Body() book: Book
    ): Observable<UpdateResult>{
        return this.bookService.updateBook(id, book);
    }

    @Delete(':id')
    deleteBook(@Param('id') id: number): Observable<DeleteResult>{
        return this.bookService.deleteBook(id);
    }
}
