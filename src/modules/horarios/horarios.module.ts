import { Horario } from '@entities/horario.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HorariosController } from './horarios.controller';
import { HorariosService } from './horarios.service';

@Module({
    imports: [TypeOrmModule.forFeature([Horario])],
    controllers: [HorariosController],
    providers: [HorariosService],
})
export class HorariosModule {}
