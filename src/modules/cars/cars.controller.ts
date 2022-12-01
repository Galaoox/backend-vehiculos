import {
    BadRequestException,
    Body,
    Controller,
    Get,
    NotFoundException,
    Param,
    Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarDto } from './dto/car.dto';
import { CarsService } from './cars.service';
import { InputCarDto } from './dto/input-car.dto';
import { FilterSearchDto } from './dto/filter-search.dto';
import { SearchResponseDto } from './dto/search-response.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarsController {
    constructor(private service: CarsService) {}

    @Post()
    async create(@Body() data: InputCarDto): Promise<CarDto> {
        try {
            return await this.service.create(data);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Post('search/')
    async findOne(@Body() data: FilterSearchDto): Promise<SearchResponseDto> {
        try {
            return await this.service.search(data);
        } catch (error) {
            console.error(error);
            throw new BadRequestException(error);
        }
    }

    @Post('upload/:id')
    async upload(@Body() data, @Param('id') id: number) {
        try {
            await this.service.uploadImage(id, data.image);
        } catch (error) {
            console.log(error);
            throw new NotFoundException();
        }
    }

    @Get('getLinesByBrand/:id')
    async getLinesByBrand(@Param('id') id: number) {
        try {
            return await this.service.getLineByBrand(id);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Get('getLists/')
    async getLists() {
        try {
            return await this.service.getLists();
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }
}
