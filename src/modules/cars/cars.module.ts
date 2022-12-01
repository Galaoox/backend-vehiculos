import { Car } from '@entities/car.entity';
import { CloudinaryModule } from '@modules/cloudinary/cloudinary.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { State } from '@entities/state.entity';
import { Line } from '@entities/line.entity';
import { Brand } from '@entities/brand.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Car, Line, State, Brand]),
        CloudinaryModule,
    ],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
