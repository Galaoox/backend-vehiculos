import {
    BadRequestException,
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Param,
    NotFoundException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriasMenuService } from './categorias-menu.service';
import { CategoriaMenuDto } from './dto/categoria-menu.dto';
import { InputCategoriaMenuDto } from './dto/input-categoria-menu.dto';

@ApiTags('Categorias menu')
@Controller('categorias-menu')
export class CategoriasMenuController {
    constructor(private categoriasMenuService: CategoriasMenuService) {}

    @Post()
    async create(@Body() categoriaMenu: InputCategoriaMenuDto) {
        try {
            await this.categoriasMenuService.create(categoriaMenu);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<CategoriaMenuDto[]> {
        return await this.categoriasMenuService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<CategoriaMenuDto> {
        try {
            return await this.categoriasMenuService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() categoriaMenu: InputCategoriaMenuDto,
    ) {
        try {
            await this.categoriasMenuService.update(id, categoriaMenu);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.categoriasMenuService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
