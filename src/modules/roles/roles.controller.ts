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
import { RolesService } from './roles.service';
import { ApiTags } from '@nestjs/swagger';
import { InputRolDto } from './dto/input-rol.dto';
import { RolDto } from './dto/rol.dto';

@ApiTags('Roles')
@Controller('roles')
export class RolesController {
    constructor(private _rolesService: RolesService) {}

    @Post()
    async create(@Body() rol: InputRolDto) {
        try {
            await this._rolesService.create(rol);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get()
    async findAll(): Promise<RolDto[]> {
        return await this._rolesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<RolDto> {
        try {
            return await this._rolesService.findOne(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() rol: InputRolDto) {
        try {
            await this._rolesService.update(id, rol);
        } catch (error) {
            throw new NotFoundException();
        }
    }

    @Delete(':id')
    async remove(@Param('id') id: number) {
        try {
            await this._rolesService.remove(id);
        } catch (error) {
            throw new NotFoundException();
        }
    }
}
