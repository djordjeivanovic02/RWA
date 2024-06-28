import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { RateService } from '../services/rate.service';
import { CreateRateDto } from '../dtos/createRate.dto';
import { Observable } from 'rxjs';
import { Rate } from '../entities/rate.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('rate')
export class RateController {
    constructor(private rateService: RateService){}

    @Post()
    create(@Body() createRateDto: CreateRateDto): Observable<Rate>{
        return this.rateService.create(createRateDto);
    }

    @Get()
    getAll(): Observable<Rate[]>{
        return this.rateService.getAllRates()
    }

    @Get(':id')
    getRate(
        @Param('id') id: number
    ): Observable<Rate>{
        return this.rateService.getRate(id);
    }

    @Get(':id/book')
    getBookRates(
        @Param('id') id: number
    ): Observable<Rate[]>{
        return this.rateService.getBookRates(id);
    }

    @Get(':id/user')
    getUserRates(
        @Param('id') id: number
    ): Observable<Rate[]>{
        return this.rateService.getUserRates(id);
    }

    @Get(':id/average')
    getBookAverageRate(
        @Param('id') id: number
    ): Observable<number>{
        return this.rateService.getBookAverageRate(id)
    }

    @Put(':id')
    updateRate(
        @Param('id') id: number,
        @Body() rate: Rate
    ): Observable<UpdateResult>{
        return this.rateService.updateRate(id, rate)
    }

    @Delete(':id')
    deleteRate(
        @Param('id') id: number
    ): Observable<DeleteResult>{
        return this.rateService.deleteRate(id)
    }
}
