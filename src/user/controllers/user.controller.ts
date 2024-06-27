import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { Observable } from 'rxjs';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() user: User): Observable<User>{
        return this.userService.createUser(user);
    }
}
