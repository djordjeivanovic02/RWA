import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { Observable, filter } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('user')
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    create(@Body() user: User): Observable<User>{
        return this.userService.createUser(user);
    }

    @Get()
    getAll(): Observable<User[]>{
        return this.userService.getAllUsers();
    }

    @Get(':id')
    getUser(
        @Param('id') id: number
    ): Observable<User>{
        return this.userService.getUser(id)
    }

    @Put(':id')
    updateUser(
        @Param('id') id: number,
        @Body() user: User
    ): Observable<UpdateResult>{
        return this.userService.updateUser(id, user);
    }

    @Delete(':id')
    deleteUser(
        @Param('id') id: number
    ): Observable<DeleteResult>{
        return this.userService.deleteUser(id);
    }
}
