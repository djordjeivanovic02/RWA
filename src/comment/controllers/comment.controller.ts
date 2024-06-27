import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CommentService } from '../service/comment.service';
import { CreateCommentDto } from '../dtos/createComment.dto';
import { Observable } from 'rxjs';
import { Comment } from '../entities/comment.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('comment')
export class CommentController {
    constructor(private commentService: CommentService){}

    @Post()
    create(@Body() comment: CreateCommentDto): Observable<Comment>{
        return this.commentService.create(comment);
    }

    @Get()
    getAll(): Observable<Comment[]>{
        return this.commentService.getAllComments();
    }

    @Get(':id')
    getCommentById(
        @Param('id') id: number
    ): Observable<Comment>{
        return this.commentService.getCommentById(id);
    }

    @Get(':id/book')
    getAllBookCommentars(
        @Param('id') id: number
    ): Observable<Comment[]>{
        return this.commentService.getBookAllComments(id)
    }

    @Put(':id')
    update(
        @Param('id') id: number,
        @Body() comment: Comment
    ): Observable<UpdateResult>{
        return this.commentService.updateComment(id, comment);
    }

    @Delete(':id')
    deleteComment(
        @Param('id') id:number
    ):Observable<DeleteResult>{
        return this.commentService.deleteComment(id);
    }
}
