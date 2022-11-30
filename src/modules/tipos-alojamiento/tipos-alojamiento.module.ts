import { Module } from '@nestjs/common';
import { TiposAlojamientoService } from './tipos-alojamiento.service';
import { TiposAlojamientoController } from './tipos-alojamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
    imports: [TypeOrmModule.forFeature([TipoAlojamiento]), CloudinaryModule],
    providers: [TiposAlojamientoService],
    controllers: [TiposAlojamientoController],
})
export class TiposAlojamientoModule {}
