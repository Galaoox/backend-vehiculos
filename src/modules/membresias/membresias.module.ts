import { Module } from '@nestjs/common';
import { MembresiasService } from './membresias.service';
import { MembresiasController } from './membresias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Membresia } from '@entities/membresia.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Membresia])],
    providers: [MembresiasService],
    controllers: [MembresiasController],
})
export class MembresiasModule {}
