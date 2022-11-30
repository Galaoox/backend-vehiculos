import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { EntradasService } from './entradas.service';

@ApiTags('entradas')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('entradas')
export class EntradasController {
    constructor(private service: EntradasService) {}

    @Post()
    async create(@Body() data: any, @Request() req) {
        try {
            data.usuarioId = req.user.id;
            await this.service.create(data);
        } catch (error) {
            throw new BadRequestException();
        }
    }

    @Get('getAllEntradasByUsuario')
    async getAllEntradasByUsuario(@Request() req): Promise<any> {
        try {
            return await this.service.getAllEntradasByUsuario(req.user.id);
        } catch (error) {
            console.error(error);
        }
    }
}
