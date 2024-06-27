import { Module } from '@nestjs/common';
import { CommentController } from './controllers/comment.controller';
import { CommentService } from './service/comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comment, User, Book])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
