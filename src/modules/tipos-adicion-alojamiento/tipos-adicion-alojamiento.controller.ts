import {
    Body,
    Controller,
    Delete,
    Get,
    Logger,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { TiposAdicionAlojamientoService } from './tipos-adicion-alojamiento.service';
import { ApiTags } from '@nestjs/swagger';
import { InputTipoAdicionAlojamientoDto } from './dto/input-tipo-adicion-alojamiento.dto';
import { TipoAdicionAlojamientoDto } from './dto/tipo-adicion-alojamiento.dto';

@ApiTags('Tipos de adiciones de alojamiento')
@Controller('tipos-adicion-alojamiento')
export class TiposAdicionAlojamientoController {
    constructor(
        private tiposAdicionAlojamientoService: TiposAdicionAlojamientoService,
    ) {}

    @Post()
    async create(
        @Body() tipoAdicionAlojamiento: InputTipoAdicionAlojamientoDto,
    ) {
        try {
            await this.tiposAdicionAlojamientoService.create(
                tipoAdicionAlojamiento,
            );
        } catch (error) {
            Logger.error(error);
        }
    }

    @Get()
    async findAll(): Promise<TipoAdicionAlojamientoDto[]> {
        try {
            return await this.tiposAdicionAlojamientoService.findAll();
        } catch (error) {
            Logger.error(error);
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TipoAdicionAlojamientoDto> {
        return await this.tiposAdicionAlojamientoService.findOne(id);
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() tipoAdicionAlojamiento: InputTipoAdicionAlojamientoDto,
    ) {
        await this.tiposAdicionAlojamientoService.update(
            id,
            tipoAdicionAlojamiento,
        );
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        await this.tiposAdicionAlojamientoService.remove(id);
    }
}
