import { AdicionAlojamiento } from '@entities/adicion-alojamiento.entity';
import { Alojamiento } from '@entities/alojamiento.entity';
import { TipoAdicionAlojamiento } from '@entities/tipo-adicion-alojamiento.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { datetoAAAMMDD } from '@utils/transform-date.utility';
import { Repository } from 'typeorm';

@Injectable()
export class HospedajeService {
    constructor(
        @InjectRepository(Alojamiento)
        private alojamientoRepository: Repository<Alojamiento>,
        @InjectRepository(AdicionAlojamiento)
        private adicionAlojamientoRepository: Repository<AdicionAlojamiento>,
    ) {}

    async create(data: any): Promise<any> {
        const resultAlojamiento = await this.alojamientoRepository.save({
            numeroPersonas: data.numeroPersonas,
            cantidadDias: data.cantidadDias,
            fechaIngreso: data.fechaIngreso,
            fechaSalida: data.fechaSalida,
            valor: data.valor,
            valorTotal: data.valorTotal,
            tipoAlojamiento: {
                id: data.tipoAlojamientoId,
            },
            usuario: {
                id: data.usuarioId,
            },
        });

        data.adiciones.forEach(async (adicion: any) => {
            await this.adicionAlojamientoRepository.save({
                alojamiento: {
                    id: resultAlojamiento.id,
                },
                tipoAdicionAlojamiento: {
                    id: adicion.id,
                },
                valor: adicion.valor,
            });
        });
    }

    async getAllHospedajesByUsusarioId(usuarioId: number): Promise<any> {
        const result = await this.alojamientoRepository.find({
            where: {
                usuario: {
                    id: usuarioId,
                },
            },
            relations: [
                'tipoAlojamiento',
                'adicionesAlojamientos',
                'adicionesAlojamientos.tipoAdicionAlojamiento',
            ],
        });

        const test = [];
        result.forEach((alojamiento: Alojamiento) => {
            const data = {
                id: alojamiento.id,
                numeroPersonas: alojamiento.numeroPersonas,
                cantidadDias: alojamiento.cantidadDias,
                fechaIngreso: datetoAAAMMDD(alojamiento.fechaIngreso),
                fechaSalida: datetoAAAMMDD(alojamiento.fechaSalida),
                valorTotal: alojamiento.valorTotal,
                tipoAlojamiento: {
                    id: alojamiento.tipoAlojamiento.id,
                    nombre: alojamiento.tipoAlojamiento.nombre,
                    valor: alojamiento.valor,
                },
                adiciones: alojamiento.adicionesAlojamientos.map((adicion) => {
                    return {
                        id: adicion.id,
                        nombre: adicion.tipoAdicionAlojamiento.nombre,
                        valor: adicion.valor,
                    };
                }),
            };
            test.push(data);
        });

        return test;
    }
}
