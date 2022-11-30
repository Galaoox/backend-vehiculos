import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdicionAlojamientoDto } from './dto/adicion-alojamiento.dto';
import { InputAdicionAlojamientoDto } from './dto/input-adicion-alojamiento.dto';

@Injectable()
export class AdicionesAlojamientoService {
    constructor(
        @InjectRepository(AdicionAlojamiento)
        private adicionAlojamientoRepository: Repository<AdicionAlojamiento>,
    ) {}

    async create(
        adicionAlojamiento: InputAdicionAlojamientoDto,
    ): Promise<AdicionAlojamientoDto> {
        return await this.adicionAlojamientoRepository.save({
            ...adicionAlojamiento,
            tipoAdicionAlojamiento: {
                id: adicionAlojamiento.tipoAdicionAlojamientoId,
            },
            alojamiento: {
                id: adicionAlojamiento.alojamientoId,
            },
        });
    }

    async update(
        id: number,
        adicionAlojamiento: InputAdicionAlojamientoDto,
    ): Promise<void> {
        const elementoMenuToUpdate =
            await this.adicionAlojamientoRepository.findOne(id);
        if (!elementoMenuToUpdate) throw new Error("Elemento doesn't exist");
        await this.adicionAlojamientoRepository.save({
            ...elementoMenuToUpdate,
            ...adicionAlojamiento,
            tipoAdicionAlojamiento: {
                id: adicionAlojamiento.tipoAdicionAlojamientoId,
            },
            alojamiento: {
                id: adicionAlojamiento.alojamientoId,
            },
        });
    }

    async remove(id: number): Promise<any> {
        return this.adicionAlojamientoRepository.softDelete(id);
    }
}
