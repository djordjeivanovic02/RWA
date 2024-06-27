import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Observable, from } from 'rxjs';

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
}
