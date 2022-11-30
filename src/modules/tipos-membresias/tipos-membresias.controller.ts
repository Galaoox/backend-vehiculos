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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TiposMembresiasService } from './tipos-membresias.service';

@ApiTags('Tipos de membresias')
@Controller('tipos-membresias')
export class TiposMembresiasController {
    constructor(private service: TiposMembresiasService) {}

    @Post()
    async create(@Body() data: any) {
        try {
            await this.service.create(data);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<any[]> {
        return await this.service.findAll();
    }

    @Get('descuentos')
    async findDescuentos(): Promise<any[]> {
        return await this.service.getTypeDiscount();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<any> {
        try {
            return await this.service.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() data: any) {
        try {
            await this.service.update(id, data);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.service.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
