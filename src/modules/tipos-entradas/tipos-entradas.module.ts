import { Module } from '@nestjs/common';
import { TiposEntradasService } from './tipos-entradas.service';
import { TiposEntradasController } from './tipos-entradas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoEntrada } from '@entities/tipo-entrada.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoEntrada])],
    providers: [TiposEntradasService],
    controllers: [TiposEntradasController],
})
export class TiposEntradasModule {}
