import { Entrada } from '@entities/entrada.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntradasController } from './entradas.controller';
import { EntradasService } from './entradas.service';

@Module({
    imports: [TypeOrmModule.forFeature([Entrada])],
    controllers: [EntradasController],
    providers: [EntradasService],
})
export class EntradasModule {}
