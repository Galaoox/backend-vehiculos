import { Module } from '@nestjs/common';
import { HospedajeService } from './hospedaje.service';
import { HospedajeController } from './hospedaje.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Alojamiento } from '@entities/alojamiento.entity';
import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Alojamiento, AdicionAlojamiento])],
    providers: [HospedajeService],
    controllers: [HospedajeController],
})
export class HospedajeModule {}
