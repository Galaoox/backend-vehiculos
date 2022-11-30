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
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuarioDto } from './dto/usuario.dto';
import { UsuariosService } from './usuarios.service';
import { Logger } from '@nestjs/common';

@ApiTags('Usuarios')
@Controller('usuarios')
export class UsuariosController {
    constructor(private usuariosService: UsuariosService) {}

    @Post()
    async create(@Body() usuario: CreateUsuarioDto) {
        try {
            await this.usuariosService.create(usuario);
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<UsuarioDto[]> {
        try {
            return await this.usuariosService.findAll();
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException();
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<UsuarioDto> {
        try {
            return await this.usuariosService.findOne(id);
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() usuario: UpdateUsuarioDto) {
        try {
            await this.usuariosService.update(id, usuario);
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.usuariosService.remove(id);
        } catch (error) {
            Logger.error(error);
            throw new BadRequestException();
        }
    }
}
