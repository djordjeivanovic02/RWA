import { Module } from '@nestjs/common';
import { RateController } from './controllers/rate.controller';
import { RateService } from './services/rate.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rate } from './entities/rate.entity';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rate, User, Book])
  ],
  controllers: [RateController],
  providers: [RateService]
})
export class RateModule {}
