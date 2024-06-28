import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rate } from '../entities/rate.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Book } from 'src/book/entities/book.entity';
import { CreateRateDto } from '../dtos/createRate.dto';
import { Observable, catchError, from, map, reduce, switchMap, throwError } from 'rxjs';

@Injectable()
export class RateService {
    constructor(
        @InjectRepository(Rate)
        private readonly rateRepository: Repository<Rate>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>
    ){}

    create(createRateDto: CreateRateDto): Observable<Rate>{
        const { user_id, book_id, ...rateData } = createRateDto;
        return from(this.userRepository.findOne({where: {id: user_id}})).pipe(
            switchMap((user) => {
                if(!user){
                    return throwError(() => new Error("Korisnik nije pronadjen"));
                }
                return from(this.bookRepository.findOne({where: {id: book_id}})).pipe(
                    switchMap((book) => {
                        if(!book){
                            return throwError(() => new Error("Knjiga nije pronadjena"));
                        }
                        const rate = this.rateRepository.create({
                            ...rateData,
                            user,
                            book
                        });
                        return from(this.rateRepository.save(rate));
                    }),
                );
            }),
            catchError((error) => throwError(() => error)),
        );
    }

    getAllRates(): Observable<Rate[]>{
        return from(this.rateRepository.find());
    }

    getRate(id: number): Observable<Rate>{
        return from(this.rateRepository.findOne({where: {id: id}}));
    }

    getBookRates(id: number): Observable<Rate[]>{
        return from(this.bookRepository.createQueryBuilder('book')
            .leftJoinAndSelect('book.rates', 'rate')
            .leftJoinAndSelect('rate.user', 'user')
            .where('book.id = :id', { id })
            .getOne()).pipe(
                switchMap((book) => {
                    if (!book) {
                        return throwError(() => new Error("Knjiga nije pronađena"));
                    }
                    return from([book.rates]);
                }),
                catchError((error) => throwError(() => error)),
        );
    }

    getUserRates(id:number): Observable<Rate[]>{
        return from(this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.rates', 'rate')
            .leftJoinAndSelect('rate.book', 'book')
            .where('user.id = :id', { id })
            .getOne()).pipe(
                switchMap((user) => {
                    if (!user) {
                        return throwError(() => new Error("Korisnik nije pronađen"));
                    }
                    return from([user.rates]);
                }),
                catchError((error) => throwError(() => error)),
        );
    }

    getBookAverageRate(id: number): Observable<number> {
        return from(this.rateRepository.find({ where: { book: { id: id } } })).pipe(
            switchMap(rates => from(rates)),
            reduce((acc, rate) => ({
                sum: acc.sum + rate.rate,
                count: acc.count + 1
            }), { sum: 0, count: 0.0 }),
            map(({ sum, count }) => {
                if (count === 0) {
                    return 0;
                }
                const average = sum / count;
                return parseFloat(average.toFixed(1));
            })
        );
    }

    updateRate(
        id: number,
        rate: Rate
    ): Observable<UpdateResult>{
        return from(this.rateRepository.update(id, rate));
    }

    deleteRate(id: number): Observable<DeleteResult>{
        return from(this.rateRepository.delete(id));
    }
}
