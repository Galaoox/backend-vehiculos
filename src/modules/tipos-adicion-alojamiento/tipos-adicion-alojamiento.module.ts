import { Module } from '@nestjs/common';
import { TiposAdicionAlojamientoService } from './tipos-adicion-alojamiento.service';
import { TiposAdicionAlojamientoController } from './tipos-adicion-alojamiento.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoAdicionAlojamiento } from '@entities/tipo-adicion-alojamiento.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TipoAdicionAlojamiento])],
    providers: [TiposAdicionAlojamientoService],
    controllers: [TiposAdicionAlojamientoController],
})
export class TiposAdicionAlojamientoModule {}
