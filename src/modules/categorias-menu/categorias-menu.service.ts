import { CategoriaMenu } from '@entities/categoria-menu.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoriaMenuDto } from './dto/categoria-menu.dto';
import { InputCategoriaMenuDto } from './dto/input-categoria-menu.dto';

@Injectable()
export class CategoriasMenuService {
    constructor(
        @InjectRepository(CategoriaMenu)
        private categoriaMenuRepository: Repository<CategoriaMenu>,
    ) {}

    async create(categoriaMenu: InputCategoriaMenuDto): Promise<void> {
        this.categoriaMenuRepository.save(categoriaMenu);
    }

    async update(
        id: number,
        categoriaMenu: InputCategoriaMenuDto,
    ): Promise<void> {
        const categoriaMenuToUpdate =
            await this.categoriaMenuRepository.findOne(id);
        if (!categoriaMenuToUpdate) throw new Error("Categoria doesn't exist");
        this.categoriaMenuRepository.save({
            ...categoriaMenuToUpdate,
            ...categoriaMenu,
        });
    }

    findAll(): Promise<CategoriaMenuDto[]> {
        return this.categoriaMenuRepository.find();
    }

    async findOne(id: number): Promise<CategoriaMenuDto> {
        const data = await this.categoriaMenuRepository.findOne(id);
        if (!data) throw new Error('Categoria not found');
        return data;
    }

    async remove(id: number): Promise<any> {
        return this.categoriaMenuRepository.softDelete(id);
    }
}
