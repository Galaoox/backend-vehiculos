import { TipoEntrada } from '@entities/tipo-entrada.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TiposEntradasService {
    constructor(
        @InjectRepository(TipoEntrada)
        private repository: Repository<TipoEntrada>,
    ) {}

    async create(data: any): Promise<void> {
        await this.repository.save(data);
    }

    async update(id: number, data: any): Promise<void> {
        const dataToUpdate = await this.repository.findOne(id);
        if (!dataToUpdate) throw new Error("Tipo documento doesn't exist");
        await this.repository.save({
            ...dataToUpdate,
            ...data,
        });
    }

    async findAll(): Promise<any[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<any> {
        const data = await this.repository.findOne(id);
        if (!data) throw new Error('Tipo documento not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }
}
