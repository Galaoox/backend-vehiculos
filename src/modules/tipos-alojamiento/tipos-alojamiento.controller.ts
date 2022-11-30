import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Put,
    Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InputTipoAlojamientoDto } from './dto/input-tipo-alojamiento.dto';
import { TipoAlojamientoDto } from './dto/tipo-alojamiento.dto';
import { TiposAlojamientoService } from './tipos-alojamiento.service';

@ApiTags('Tipos de alojamiento')
@Controller('tipos-alojamiento')
export class TiposAlojamientoController {
    constructor(private tipoAlojamientoService: TiposAlojamientoService) {}

    @Post()
    async create(
        @Body() tipoAlojamiento: InputTipoAlojamientoDto,
    ): Promise<TipoAlojamientoDto> {
        return await this.tipoAlojamientoService.create(tipoAlojamiento);
    }

    @Get()
    async findAll(): Promise<TipoAlojamientoDto[]> {
        return await this.tipoAlojamientoService.findAll();
    }

    @Get('findOne/:id')
    async findOne(@Param('id') id: number): Promise<TipoAlojamientoDto> {
        return await this.tipoAlojamientoService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() categoriaMenu: InputTipoAlojamientoDto,
    ) {
        await this.tipoAlojamientoService.update(id, categoriaMenu);
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.tipoAlojamientoService.remove(id);
    }

    @Post('upload/:id')
    async upload(@Body() data, @Param('id') id: number) {
        await this.tipoAlojamientoService.uploadImage(id, data.image);
    }
}
