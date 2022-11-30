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
import { InputTipoDocumentoDto } from './dto/input-tipo-documento.dto';
import { TipoDocumentoDto } from './dto/tipo-documento.dto';
import { TiposDocumentosService } from './tipos-documentos.service';

@ApiTags('Tipos de documentos')
@Controller('tipos-documentos')
export class TiposDocumentosController {
    constructor(private tiposDocumentosService: TiposDocumentosService) {}

    @Post()
    async create(@Body() tipoDocumento: InputTipoDocumentoDto) {
        try {
            await this.tiposDocumentosService.create(tipoDocumento);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<TipoDocumentoDto[]> {
        return await this.tiposDocumentosService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<TipoDocumentoDto> {
        try {
            return await this.tiposDocumentosService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(
        @Param('id') id: number,
        @Body() tipoDocumento: InputTipoDocumentoDto,
    ) {
        try {
            await this.tiposDocumentosService.update(id, tipoDocumento);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.tiposDocumentosService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
