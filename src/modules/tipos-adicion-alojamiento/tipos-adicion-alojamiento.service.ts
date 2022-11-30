import { TipoAdicionAlojamiento } from '@entities/tipo-adicion-alojamiento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpNotFoundError } from '@utils/custom-errors-http.utility';
import { Repository } from 'typeorm';
import { InputTipoAdicionAlojamientoDto } from './dto/input-tipo-adicion-alojamiento.dto';
import { TipoAdicionAlojamientoDto } from './dto/tipo-adicion-alojamiento.dto';

@Injectable()
export class TiposAdicionAlojamientoService {
    constructor(
        @InjectRepository(TipoAdicionAlojamiento)
        private tipoAdicionAlojamientoRepository: Repository<TipoAdicionAlojamiento>,
    ) {}

    async create(
        tipoAdicionAlojamiento: InputTipoAdicionAlojamientoDto,
    ): Promise<void> {
        this.tipoAdicionAlojamientoRepository.save(tipoAdicionAlojamiento);
    }

    async update(
        id: number,
        tipoAdicionAlojamiento: InputTipoAdicionAlojamientoDto,
    ): Promise<void> {
        const tipoAdicionAlojamientoToUpdate =
            await this.tipoAdicionAlojamientoRepository.findOne(id);
        if (!tipoAdicionAlojamientoToUpdate) {
            throw new HttpNotFoundError(
                'Tipo de adición de alojamiento no encontrado',
            );
        }
        this.tipoAdicionAlojamientoRepository.save({
            ...tipoAdicionAlojamientoToUpdate,
            ...tipoAdicionAlojamiento,
        });
    }

    async findAll(): Promise<TipoAdicionAlojamientoDto[]> {
        return this.tipoAdicionAlojamientoRepository.find({
            select: ['id', 'nombre', 'descripcion', 'valor'],
        });
    }

    async findOne(id: number): Promise<TipoAdicionAlojamientoDto> {
        const data = await this.tipoAdicionAlojamientoRepository.findOne(id, {
            select: ['id', 'nombre', 'descripcion', 'valor'],
        });
        if (!data) {
            throw new HttpNotFoundError(
                'Tipo de adición de alojamiento no encontrado',
            );
        }
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.tipoAdicionAlojamientoRepository.softDelete(id);
    }
}
