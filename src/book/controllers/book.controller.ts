import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Book } from '../entities/book.entity';
import { Observable } from 'rxjs';
import { BookService } from '../services/book.service';
import { CreateBookDto } from '../dtos/createBook.dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('book')
export class BookController {
    constructor(private bookService: BookService){}

    @Post()
    @UseInterceptors(
    FilesInterceptor('files', 2, {
        storage: diskStorage({
        destination: (req, file, cb) => {
            const isImage = file.mimetype.startsWith('image/');
            const isPdf = file.mimetype === 'application/pdf';
            
            if (isImage) {
            cb(null, 'public/img');
            } else if (isPdf) {
            cb(null, 'public/pdf');
            } else {
            cb(new Error('Invalid file type'), null);
            }
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
        }),
        fileFilter: (req, file, cb) => {
        const isImage = file.mimetype.startsWith('image/');
        const isPdf = file.mimetype === 'application/pdf';
        
        if (isImage || isPdf) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'), false);
        }
        },
    }),
    )
    create(
    @Body() book: CreateBookDto,
    @UploadedFiles() files: Express.Multer.File[]
    ): Observable<Book> {
    files.forEach(file => {
        if (file.mimetype.startsWith('image/')) {
        book.image = `/public/img/${file.originalname}`;
        } else if (file.mimetype === 'application/pdf') {
        book.document = `/public/pdf/${file.originalname}`;
        }
    });

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
