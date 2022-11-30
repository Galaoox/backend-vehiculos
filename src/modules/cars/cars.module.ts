import { Car } from '@entities/car.entity';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarController } from './cars.controller';
import { CarService } from './cars.service';

@Module({
    imports: [TypeOrmModule.forFeature([Car]), CloudinaryModule],
    controllers: [CarController],
    providers: [CarService],
})
export class CarsModule { }
