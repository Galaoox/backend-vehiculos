import { Entrada } from '@entities/entrada.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { datetoAAAMMDD } from '@utils/transform-date.utility';
import { Repository } from 'typeorm';

@Injectable()
export class EntradasService {
    constructor(
        @InjectRepository(Entrada)
        private repository: Repository<Entrada>,
    ) { }

    async create(data: any) {
        await this.repository.save({
            valorTotal: data.valorTotal,
            valorUnitario: data.valorUnitario,
            cantidad: data.cantidad,
            usuario: {
                id: data.usuarioId,
            },
            tipoEntrada: {
                id: data.tipoEntradaId,
            },
        });
    }

    async getAllEntradasByUsuario(usuarioId: number) {
        const result = await this.repository.find({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },
            relations: ['usuario', 'tipoEntrada'],
        });

        const data = result.map((item) => {
            return {
                id: item.id,
                valorTotal: item.valorTotal,
                valorUnitario: item.valorUnitario,
                cantidad: item.cantidad,
                fechaCompra: datetoAAAMMDD(item.created_at),
                tipo: item.tipoEntrada.nombre,
            };
        });

        return data;
    }
}
