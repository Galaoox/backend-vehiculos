import { Car } from "@entities/car.entity";
import { CloudinaryModule } from "@modules/cloudinary/cloudinary.module";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CarsController } from "./cars.controller";
import { CarsService } from "./cars.service";

@Module({
    imports: [TypeOrmModule.forFeature([Car]), CloudinaryModule],
    controllers: [CarsController],
    providers: [CarsService],
})
export class CarsModule {}
