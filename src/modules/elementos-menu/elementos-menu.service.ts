import { ElementoMenu } from '@entities/elemento-menu.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ElementoMenuDto } from './dto/elemento-menu.dto';
import { GroupedElementoMenuDto } from './dto/grouped-elemento-menu.dto';
import { InputElementoMenuDto } from './dto/input-elemento-menu.dto';
import { CloudinaryService } from '@modules/cloudinary/cloudinary.service';

@Injectable()
export class ElementosMenuService {
    constructor(
        @InjectRepository(ElementoMenu)
        private elementoMenuRepository: Repository<ElementoMenu>,
        private cloudinary: CloudinaryService,
    ) {}

    async create(elementoMenu: InputElementoMenuDto): Promise<ElementoMenuDto> {
        return await this.elementoMenuRepository.save({
            ...elementoMenu,
            categoriaMenu: {
                id: elementoMenu.categoriaMenuId,
            },
        });
    }

    async update(
        id: number,
        elementoMenu: InputElementoMenuDto,
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

    async findAll(): Promise<ElementoMenuDto[]> {
        const data = await this.elementoMenuRepository.find({
            relations: ['categoriaMenu'],
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

    async findOne(id: number): Promise<ElementoMenuDto> {
        const data = await this.elementoMenuRepository.findOne(id, {
            relations: ['categoriaMenu'],
        });
        data.imagen = await this.cloudinary.getUrlImage(data.imagen);
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async findGroupedByCategoryMenu(): Promise<GroupedElementoMenuDto> {
        const data = await this.elementoMenuRepository.find({
            relations: ['categoriaMenu'],
        });
        const groupedData = {};
        data.forEach(async (item) => {
            if (!groupedData[item.categoriaMenu.nombre]) {
                groupedData[item.categoriaMenu.nombre] = [];
            }
            item.imagen = await this.cloudinary.getUrlImage(item.imagen);

            groupedData[item.categoriaMenu.nombre].push(item);
        });
        return groupedData;
    }

    async remove(id: number): Promise<any> {
        return this.elementoMenuRepository.softDelete(id);
    }

    async uploadImage(id: number, imagen: string): Promise<void> {
        const elementoMenuToUpdate = await this.elementoMenuRepository.findOne(
            id,
        );
        if (!elementoMenuToUpdate)
            throw new Error("Elemento Menu doesn't exist");
        if (elementoMenuToUpdate.imagen) {
            await this.cloudinary.deleteImage(elementoMenuToUpdate.imagen);
        }
        const result = await this.cloudinary
            .uploadImageBase64(imagen)
            .catch((e) => {
                throw new BadRequestException('Invalid file type.');
            });
        elementoMenuToUpdate.imagen = result.public_id;
        this.elementoMenuRepository.save(elementoMenuToUpdate);
    }
}
