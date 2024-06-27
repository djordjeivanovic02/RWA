import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { Book } from '../entities/book.entity';
import { User } from 'src/user/entities/user.entity';
import { CreateBookDto } from '../dtos/createBook.dto';
import { Observable, catchError, from, switchMap, throwError } from 'rxjs';

@Injectable()
export class BookService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,

        @InjectRepository(User)
        private userRepository: Repository<User>
    ){}

    create(createBookDto: CreateBookDto): Observable<Book> {
        const { author_id, ...bookData } = createBookDto;
    
        return from(this.userRepository.findOne({ where: { id: author_id } })).pipe(
          switchMap((author) => {
            if (!author) {
              return throwError(() => new Error('Author not found'));
            }
    
            const book = this.bookRepository.create({
              ...bookData,
              author,
            });
    
            return from(this.bookRepository.save(book));
          }),
          catchError((error) => throwError(() => error)),
        );
      }

    getAllBooks():Observable<Book[]>{
      return from(this.bookRepository.find());
    }

    getBook(id: number): Observable<Book>{
      return from(this.bookRepository.findOne({where: {id: id}}));
    }

    updateBook(
      id: number,
      book: Book
    ): Observable<UpdateResult>{
      return from(this.bookRepository.update(id, book));
    }

    deleteBook(id: number): Observable<DeleteResult>{
      return from(this.bookRepository.delete(id));
    }
}
