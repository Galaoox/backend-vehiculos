import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
    Body,
    Controller,
    Get,
    Post,
    Request,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { MembresiasService } from './membresias.service';

@ApiTags('Membresias')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('membresias')
export class MembresiasController {
    constructor(private service: MembresiasService) {}

    @Post()
    async create(@Body() data: any, @Request() req): Promise<any> {
        try {
            data.usuarioId = req.user.id;
            await this.service.create(data);
        } catch (error) {
            console.error(error);
        }
    }

    @Get('membresia-usuario')
    async getMembresiasByUser(@Request() req): Promise<any> {
        try {
            return await this.service.getMembresiasByUser(req.user.id);
        } catch (error) {
            console.error(error);
        }
    }
}
