import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
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
}
