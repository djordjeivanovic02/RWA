import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { Observable, catchError, filter, from, map, switchMap, throwError } from 'rxjs';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class CommentService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    create(createCommentDto: CreateCommentDto): Observable<Comment>{
        const { user_id, book_id, ...commentData } = createCommentDto;
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
      
                  const comment = this.commentRepository.create({
                    ...commentData,
                    user,
                    book,
                  });
      
                  return from(this.commentRepository.save(comment));
                }),
              );
            }),
            catchError((error) => throwError(() => error)),
          );
        }

    getAllComments():Observable<Comment[]>{
      return from(this.commentRepository.find())
    }

    getCommentById(id: number): Observable<Comment>{
      return from(this.commentRepository.findOne({where: {id: id}}));
    }

    getBookAllComments(id: number): Observable<Comment[]> {
      return from(this.bookRepository.findOne({ where: { id: id }, relations: ['comments'] })).pipe(
        switchMap((book) => {
          if (!book) {
            return throwError(() => new Error('Knjiga nije pronađena'));
          }
          return from([book.comments]);
        }),
        catchError((error) => throwError(() => error)),
      );
    }

    updateComment(id: number, comment: Comment): Observable<UpdateResult>{
      return from(this.commentRepository.update(id, comment));
    }

    deleteComment(id: number): Observable<DeleteResult>{
      return from(this.commentRepository.delete(id));
    }
}
