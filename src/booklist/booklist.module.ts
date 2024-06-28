import { Module } from '@nestjs/common';
import { BooklistController } from './controllers/booklist.controller';
import { BooklistService } from './services/booklist.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookList } from './entities/booklist.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BookList, User, Book])
  ],
  controllers: [BooklistController],
  providers: [BooklistService]
})
export class BooklistModule {}
