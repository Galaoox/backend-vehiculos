import { TipoMembresia } from '@entities/tipo-membresia.entity';
import { TypesDiscount } from '@enums/type-discount.enum';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TiposMembresiasService {
    constructor(
        @InjectRepository(TipoMembresia)
        private repository: Repository<TipoMembresia>,
    ) {}

    async create(data: any): Promise<void> {
        await this.repository.save(data);
    }

    async update(id: number, data: any): Promise<void> {
        const dataToUpdate = await this.repository.findOne(id);
        if (!dataToUpdate) throw new Error("Tipo membresia doesn't exist");
        await this.repository.save({
            ...dataToUpdate,
            ...data,
        });
    }

    async findAll(): Promise<any[]> {
        return this.repository.find({
            select: ['id', 'nombre', 'descripcion', 'descuentos', 'valor'],
        });
    }

    async findOne(id: number): Promise<any> {
        const data = await this.repository.findOne(id, {
            select: ['id', 'nombre', 'descripcion', 'descuentos', 'valor'],
        });
        if (!data) throw new Error('Tipo membresia not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }

    async getTypeDiscount() {
        return TypesDiscount;
    }
}
