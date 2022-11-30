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
import { HorariosService } from './horarios.service';
import { ApiTags } from '@nestjs/swagger';
import { InputHorarioDto } from './dto/input-horario.dto';
import { HorarioDto } from './dto/horario.dto';

@ApiTags('Horarios')
@Controller('horarios')
export class HorariosController {
    constructor(private rolesService: HorariosService) {}

    @Post()
    async create(@Body() horario: InputHorarioDto) {
        try {
            await this.rolesService.create(horario);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<HorarioDto[]> {
        try {
            return await this.rolesService.findAll();
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<HorarioDto> {
        try {
            return await this.rolesService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() horario: InputHorarioDto) {
        try {
            await this.rolesService.update(id, horario);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this.rolesService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
