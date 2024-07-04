import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { BooklistService } from '../services/booklist.service';
import { CreateBookListDto } from '../dtos/createBooklist.dto';
import { Observable } from 'rxjs';
import { BookList } from '../entities/booklist.entity';
import { Book } from 'src/book/entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('booklist')
export class BooklistController {
    constructor(private booklistService: BooklistService){}

    @Post()
    create(@Body() createBooklistDto: CreateBookListDto): Observable<BookList>{
        return this.booklistService.create(createBooklistDto);
    }

    @Get(':id/userReaded')
    getUserReaded(
        @Param('id') id: number
    ): Observable<Book[]>{
        return this.booklistService.getUserReadedBooks(id);
    }

    @Get(':id/userToRead')
    getUserToRead(
        @Param('id') id: number
    ): Observable<Book[]>{
        return this.booklistService.getUserToReadBooks(id);
    }

    @Get(':id/readed')
    getUsersReaded(
        @Param('id') id: number
    ):Observable<User[]>{
        return this.booklistService.getUsersWhoReaded(id);
    }

    @Get(':id/toRead')
    getUsersToRead(
        @Param('id') id: number
    ):Observable<User[]>{
        return this.booklistService.getUsersWhoWantToRead(id);
    }

    @Get(':userId/:bookId')
    getUserBookStatus(
        @Param('userId') userId: number,
        @Param('bookId') bookId: number
    ): Observable<BookList>{
        return this.booklistService.getUserBookStatus(userId, bookId);
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() bookList: BookList
    ): Observable<UpdateResult>{
        return this.booklistService.updateBookListStatus(id, bookList);
    }

    @Delete(':id')
    deleteBookList(
        @Param('id') id: number
    ): Observable<DeleteResult>{
        return this.booklistService.deleteBookListStatus(id);
    }

    @Delete(':bookId/:userId')
    deleteBookListByUsers(
        @Param('bookId') bookId: number,
        @Param('userId') userId: number
    ): Observable<DeleteResult>{
        return this.booklistService.deleteBookListWhereUser(bookId, userId);
    }
}
