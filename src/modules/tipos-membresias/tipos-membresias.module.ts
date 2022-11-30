import { TipoMembresia } from '@entities/tipo-membresia.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TiposMembresiasController } from './tipos-membresias.controller';
import { TiposMembresiasService } from './tipos-membresias.service';

@Module({
    imports: [TypeOrmModule.forFeature([TipoMembresia])],
    controllers: [TiposMembresiasController],
    providers: [TiposMembresiasService],
})
export class TiposMembresiasModule {}
