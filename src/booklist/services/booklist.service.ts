import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookList } from '../entities/booklist.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { CreateBookListDto } from '../dtos/createBooklist.dto';
import { Observable, catchError, filter, from, map, of, switchMap, throwError, toArray } from 'rxjs';

@Injectable()
export class BooklistService {
    constructor(
        @InjectRepository(BookList)
        private readonly listRepository: Repository<BookList>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    create(createBookListDto: CreateBookListDto): Observable<BookList>{
        const { user_id, book_id, ...booklistData } = createBookListDto;
        return from(this.userRepository.findOne({ where: { id: user_id } })).pipe(
            switchMap((user) => {
              if (!user) {
                return throwError(() => new Error('Korisnik nije pronadjen'));
              }
      
              return from(this.bookRepository.findOne({ where: { id: book_id } })).pipe(
                switchMap((book) => {
                  if (!book) {
                    return throwError(() => new Error('Knjiga nije pronadjena'));
                  }
      
                  const booklist = this.listRepository.create({
                    ...booklistData,
                    user,
                    book,
                  });
      
                  return from(this.listRepository.save(booklist));
                }),
              );
            }),
            catchError((error) => throwError(() => error)),
          );
        }

    private getUserListBooks(
        id: number, 
        type: 'to_read' | 'readed'
    ): Observable<Book[]> {
        return from(this.userRepository.findOne({ where: { id: id }, relations: ['lists'] })).pipe(
            switchMap((user) => {
                if (!user) {
                    return throwError(() => new Error('Korisnik nije pronađen'));
                }
                return from(this.listRepository.find({ where: { user: { id: user.id }, type: type}, relations: ['book']})).pipe(
                    switchMap((bookList) => {
                        if (!bookList || bookList.length === 0) {
                            return of([]);
                        }
                        const books = bookList.map((list) => list.book);
                        return of(books);
                    }),
                    catchError((error) => throwError(() => error))
                );
            }),
            catchError((error) => throwError(() => error))
        );
    }

    getUserReadedBooks(id: number): Observable<Book[]> {
        return this.getUserListBooks(id, 'readed');
    }

    getUserToReadBooks(id: number): Observable<Book[]>{
        return this.getUserListBooks(id, 'to_read');
    }

    private getBookFromListBooks(
        id: number, 
        type: 'to_read' | 'readed'
    ): Observable<User[]> {
        return from(this.bookRepository.findOne({ where: { id: id }, relations: ['lists'] })).pipe(
            switchMap((book) => {
                if (!book) {
                    return throwError(() => new Error('Knjiga nije pronađena'));
                }
                return from(this.listRepository.find({ where: { book: { id: book.id }, type: type}, relations: ['user']})).pipe(
                    switchMap((userList) => {
                        if (!userList || userList.length === 0) {
                            return of([]);
                        }
                        const users = userList.map((list) => list.user);
                        return of(users);
                    }),
                    catchError((error) => throwError(() => error))
                );
            }),
            catchError((error) => throwError(() => error))
        );
    }

    getUsersWhoReaded(id: number): Observable<User[]> {
        return this.getBookFromListBooks(id, 'readed');
    }

    getUsersWhoWantToRead(id: number): Observable<User[]> {
        return this.getBookFromListBooks(id, 'to_read');
    }

    getUserBookStatus(
        user_id: number,
        book_id: number
    ): Observable<BookList>{
        return from(this.listRepository.findOne({where: {user: {id: user_id}, book: {id: book_id}}}))
    }

    updateBookListStatus(
        id: number,
        bookList: BookList
    ): Observable<UpdateResult>{
        return from(this.listRepository.update(id, bookList));
    }

    deleteBookListStatus(id: number): Observable<DeleteResult>{
        return from(this.listRepository.delete(id));
    }
}
