import { Membresia } from '@entities/membresia.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { datetoAAAMMDD } from '../../utils/transform-date.utility';

@Injectable()
export class MembresiasService {
    constructor(
        @InjectRepository(Membresia)
        private repository: Repository<Membresia>,
    ) {}

    async create(data: any) {
        await this.repository.softDelete({
            usuario: {
                id: data.usuarioId,
            },
        });
        return await this.repository.save({
            valor: data.valor,
            descuentos: data.descuentos,
            fechaInicio: data.fechaInicio,
            fechaFin: data.fechaFin,
            tipoMembresia: {
                id: data.tipoMembresiaId,
            },
            usuario: {
                id: data.usuarioId,
            },
        });
    }

    async getMembresiasByUser(usuarioId: number) {
        const result = await this.repository.findOne({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },
            relations: ['tipoMembresia'],
        });
        return {
            ...result,
            fechaInicio: datetoAAAMMDD(result.fechaInicio),
            fechaFin: datetoAAAMMDD(result.fechaFin),
        };
    }
}
