import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CarDto } from './dto/car.dto';
import { InputCarDto } from './dto/input-car.dto';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';
import { Car } from '@entities/car.entity';

@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private elementoMenuRepository: Repository<Car>,
        private cloudinary: CloudinaryService,
    ) { }

    async create(elementoMenu: InputCarDto): Promise<CarDto> {
        return await this.elementoMenuRepository.save({
            ...elementoMenu,
            categoriaMenu: {
                id: elementoMenu.categoriaMenuId,
            },
        });
    }

    async update(
        id: number,
        elementoMenu: InputCarDto,
    ): Promise<void> {
        const elementoMenuToUpdate = await this.elementoMenuRepository.findOne(
            id,
        );
        if (!elementoMenuToUpdate) throw new Error("Elemento doesn't exist");
        this.elementoMenuRepository.save({
            ...elementoMenuToUpdate,
            ...elementoMenu,
            categoriaMenu: {
                id: elementoMenu.categoriaMenuId,
            },
        });
    }

    async findAll(): Promise<CarDto[]> {
        const data = await this.elementoMenuRepository.find({
            relations: ['categoriaMenu'],
        });
        const promises = await data.map(async (item) => {
            return {
                ...item,
                imagen: await this.cloudinary.getUrlImage(item.image),
            };
        });
        const result = await Promise.all(promises);
        return result;
    }

    async findOne(id: number): Promise<CarDto> {
        const data = await this.elementoMenuRepository.findOne(id, {
            relations: ['categoriaMenu'],
        });
        data.image = await this.cloudinary.getUrlImage(data.image);
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.elementoMenuRepository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const dataToUpdate = await this.elementoMenuRepository.findOne(
            id,
        );
        if (!dataToUpdate)
            throw new Error("Elemento Menu doesn't exist");
        if (dataToUpdate.image) {
            await this.cloudinary.deleteImage(dataToUpdate.image);
        }
        const result = await this.cloudinary
            .uploadImageBase64(imagen)
            .catch(() => {
                throw new BadRequestException('Invalid file type.');
            });
        dataToUpdate.image = result.public_id;
        this.elementoMenuRepository.save(dataToUpdate);
    }
}
