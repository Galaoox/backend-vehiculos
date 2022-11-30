import { JwtAuthGuard } from '@guards/jwt-auth.guard';
import {
    BadRequestException,
    Body,
    Controller,
    Get,
    Logger,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { RegisterUsuarioDto } from './dto/register-usuario.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    async register(@Body() usuario: RegisterUsuarioDto) {
        return await this.authService.registerUser(usuario);
    }

    @Post('login')
    async login(@Body() usuario: LoginUsuarioDto) {
        return await this.authService.login(usuario);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get('test')
    async test() {
        return [];
    }
}
