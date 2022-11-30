import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from '@utils/file-upload.utility';
import { diskStorage } from 'multer';
import { ElementoMenuDto } from './dto/elemento-menu.dto';
import { GroupedElementoMenuDto } from './dto/grouped-elemento-menu.dto';
import { InputElementoMenuDto } from './dto/input-elemento-menu.dto';
import { ElementosMenuService } from './elementos-menu.service';

@ApiTags('Elementos menu')
@Controller('elementos-menu')
export class ElementosMenuController {
    constructor(private elementosMenuService: ElementosMenuService) {}

    @Post()
    async create(
        @Body() categoriaMenu: InputElementoMenuDto,
    ): Promise<ElementoMenuDto> {
        try {
            return await this.elementosMenuService.create(categoriaMenu);
        } catch (error) {
            console.error(error);
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<ElementoMenuDto[]> {
        return await this.elementosMenuService.findAll();
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id: number): Promise<ElementoMenuDto> {
        try {
            return await this.elementosMenuService.findOne(id);
        } catch (error) {
            console.error(error);
            throw new NotFoundException();
        }
    }

    @Get('/grouped')
    async findGroupedByCategoryMenu(): Promise<GroupedElementoMenuDto> {
        return await this.elementosMenuService.findGroupedByCategoryMenu();
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() categoriaMenu: InputElementoMenuDto,
    ) {
        try {
            await this.elementosMenuService.update(id, categoriaMenu);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.elementosMenuService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Post('upload/:id')
    async upload(@Body() data, @Param('id') id: number) {
        try {
            await this.elementosMenuService.uploadImage(id, data.image);
        } catch (error) {
            console.log(error);
            throw new NotFoundException();
        }
    }
}
