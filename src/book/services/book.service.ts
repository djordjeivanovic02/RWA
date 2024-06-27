import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
}
