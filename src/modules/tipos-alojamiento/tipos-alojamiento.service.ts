import { TipoAlojamiento } from '@entities/tipo-alojamiento.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InputTipoAlojamientoDto } from './dto/input-tipo-alojamiento.dto';
import { TipoAlojamientoDto } from './dto/tipo-alojamiento.dto';
import { HttpNotFoundError } from '@utils/custom-errors-http.utility';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';

@Injectable()
export class TiposAlojamientoService {
    constructor(
        @InjectRepository(TipoAlojamiento)
        private repository: Repository<TipoAlojamiento>,
        private cloudinary: CloudinaryService,
    ) {}

    async create(
        tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<TipoAlojamientoDto> {
        return await this.repository.save({
            ...tipoAlojamiento,
        });
    }

    async update(
        id: number,
        tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<void> {
        const tipoAlojamientoToUpdate = await this.repository.findOne(id);
        if (!tipoAlojamientoToUpdate) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        this.repository.save({
            ...tipoAlojamientoToUpdate,
            ...tipoAlojamiento,
        });
    }

    async findAll(): Promise<TipoAlojamientoDto[]> {
        const data = await this.repository.find();
        const promises = await data.map(async (item) => {
            return {
                ...item,
                imagen: await this.cloudinary.getUrlImage(item.imagen),
            };
        });
        const result = await Promise.all(promises);
        return result;
    }

    async findOne(id: number): Promise<TipoAlojamientoDto> {
        const data = await this.repository.findOne(id);
        if (!data) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        data.imagen = await this.cloudinary.getUrlImage(data.imagen);
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.repository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const tipoAlojamientoToUpdate = await this.repository.findOne(id);
        if (!tipoAlojamientoToUpdate) {
            throw new HttpNotFoundError('El tipo de alojamiento no existe');
        }
        if (tipoAlojamientoToUpdate.imagen)
            await this.cloudinary.deleteImage(tipoAlojamientoToUpdate.imagen);
        const result = await this.cloudinary
            .uploadImageBase64(imagen)
            .catch((e) => {
                console.log(e);
                console.log(imagen);
                throw new BadRequestException('Invalid file type.');
            });
        tipoAlojamientoToUpdate.imagen = result.public_id;
        this.repository.save(tipoAlojamientoToUpdate);
    }
}
