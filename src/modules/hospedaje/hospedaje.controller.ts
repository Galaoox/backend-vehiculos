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
import { HospedajeService } from './hospedaje.service';

@ApiTags('Hospedaje')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('hospedaje')
export class HospedajeController {
    constructor(private hospedajeService: HospedajeService) {}

    @Post()
    async create(@Body() data: any, @Request() req): Promise<any> {
        try {
            data.usuarioId = req.user.id;
            await this.hospedajeService.create(data);
        } catch (error) {
            console.error(error);
        }
    }

    @Get('getAllHospedajesByUsuario')
    async getAllHospedajesByUsuario(@Request() req): Promise<any> {
        try {
            return await this.hospedajeService.getAllHospedajesByUsusarioId(
                req.user.id,
            );
        } catch (error) {
            console.error(error);
        }
    }
}
