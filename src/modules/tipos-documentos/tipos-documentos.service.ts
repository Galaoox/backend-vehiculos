import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TipoDocumento } from '@entities/tipo-documento.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InputTipoDocumentoDto } from './dto/input-tipo-documento.dto';
import { TipoDocumentoDto } from './dto/tipo-documento.dto';

@Injectable()
export class TiposDocumentosService {
    constructor(
        @InjectRepository(TipoDocumento)
        private tipoDocumentoRepository: Repository<TipoDocumento>,
    ) {}

    async create(tipoDocumento: InputTipoDocumentoDto): Promise<void> {
        await this.tipoDocumentoRepository.save(tipoDocumento);
    }

    async update(
        id: number,
        tipoDocumento: InputTipoDocumentoDto,
    ): Promise<void> {
        const tipoDocumentoToUpdate =
            await this.tipoDocumentoRepository.findOne(id);
        if (!tipoDocumentoToUpdate)
            throw new Error("Tipo documento doesn't exist");
        await this.tipoDocumentoRepository.save({
            ...tipoDocumentoToUpdate,
            ...tipoDocumento,
        });
    }

    async findAll(): Promise<TipoDocumentoDto[]> {
        return this.tipoDocumentoRepository.find({
            select: ['id', 'nombre'],
        });
    }

    async findOne(id: number): Promise<TipoDocumentoDto> {
        const data = await this.tipoDocumentoRepository.findOne(id, {
            select: ['id', 'nombre'],
        });
        if (!data) throw new Error('Tipo documento not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.tipoDocumentoRepository.softDelete(id);
    }
}
