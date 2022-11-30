import { Atraccion } from '@entities/atraccion.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputAtraccionDto } from './dto/input-atraccion.dto';
import { AtraccionDto } from './dto/atraccion.dto';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';

@Injectable()
export class AtraccionesService {
    constructor(
        @InjectRepository(Atraccion)
        private atraccionesRepository: Repository<Atraccion>,
        private cloudinary: CloudinaryService,
    ) {}

    async create(atraccion: InputAtraccionDto): Promise<AtraccionDto> {
        return await this.atraccionesRepository.save(atraccion);
    }

    async update(id: number, atraccion: InputAtraccionDto): Promise<void> {
        const atraccionToUpdate = await this.atraccionesRepository.findOne(id);
        if (!atraccionToUpdate) throw new Error("atraccion doesn't exist");
        this.atraccionesRepository.save({ ...atraccionToUpdate, ...atraccion });
    }

    async uploadImage(id: number, file: string): Promise<any> {
        const atraccionToUpdate = await this.atraccionesRepository.findOne(id);
        if (!atraccionToUpdate) throw new Error("atraccion doesn't exist");
        if (atraccionToUpdate.imagen)
            await this.cloudinary.deleteImage(atraccionToUpdate.imagen);
        const result = await this.cloudinary
            .uploadImageBase64(file)
            .catch((e) => {
                throw new BadRequestException('Invalid file type.');
            });
        atraccionToUpdate.imagen = result.public_id;

        this.atraccionesRepository.save(atraccionToUpdate);
    }

    async findAll(): Promise<AtraccionDto[]> {
        const data: AtraccionDto[] = await this.atraccionesRepository.find({
            select: ['id', 'nombre', 'descripcion', 'imagen'],
        });
        const promises = await data.map(async (item) => {
            return {
                ...item,
                imagen: await this.cloudinary.getUrlImage(item.imagen),
            };
        });
        const result = await Promise.all(promises);
        return result;
    }

    async findOne(id: number): Promise<AtraccionDto> {
        const data = await this.atraccionesRepository.findOne(id, {
            select: ['id', 'nombre'],
        });
        if (!data) throw new Error('atraccion not found');
        data.imagen = await this.cloudinary.getUrlImage(data.imagen);
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.atraccionesRepository.softDelete(id);
    }
}
