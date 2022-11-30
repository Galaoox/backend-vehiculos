import { Module } from '@nestjs/common';
import { AtraccionesController } from './atracciones.controller';
import { AtraccionesService } from './atracciones.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Atraccion } from '@entities/atraccion.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    imports: [TypeOrmModule.forFeature([Atraccion]), CloudinaryModule],
    controllers: [AtraccionesController],
    providers: [AtraccionesService],
})
export class AtraccionesModule {}
