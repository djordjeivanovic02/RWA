import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from, map } from 'rxjs';
import { Book } from 'src/book/entities/book.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>
    ){}

    createUser(user: User): Observable<User>{
        return from(this.userRepository.save(user));
    }

    getAllUsers(): Observable<User[]>{
        return from(this.userRepository.find());
    }

    getUser(id: number): Observable<User>{
        return from(this.userRepository.findOne({where: {id: id}}));
    }

    updateUser(
        id: number, 
        user: User
    ):Observable<UpdateResult>{
        return from(this.userRepository.update(id, user));
    }

    deleteUser(id: number): Observable<DeleteResult>{
        return from(this.userRepository.delete(id));
    }

    getUserBooks(id: number): Observable<Book[]>{
        return from(
            this.userRepository.findOne({where: {id: id}, relations: ["books"]}),
          ).pipe(
            map((user: User | undefined) => {
              if (!user) {
                throw new Error(`User with id ${id} not found`);
              }
              return user.books;
            }),
          );
    }
}
