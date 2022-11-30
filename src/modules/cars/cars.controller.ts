import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CarDto } from './dto/car.dto';
import { CarService } from './cars.service';
import { InputCarDto } from './dto/input-car.dto';

@ApiTags('Cars')
@Controller('cars')
export class CarController {
    constructor(private carsService: CarService) { }

    @Post()
    async create(@Body() data: InputCarDto): Promise<CarDto> {
        try {
            return await this.carsService.create(data);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<CarDto[]> {
        return await this.carsService.findAll();
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id: number): Promise<CarDto> {
        try {
            return await this.carsService.findOne(id);
        } catch (error) {
            console.error(error);
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: InputCarDto) {
        try {
            await this.carsService.update(id, data);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.carsService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Post('upload/:id')
    async upload(@Body() data, @Param('id') id: number) {
        try {
            await this.carsService.uploadImage(id, data.image);
        } catch (error) {
            console.log(error);
            throw new NotFoundException();
        }
    }
}
