import { Roles } from '@enums/roles.enum';
import { CreateUsuarioDto } from '@modules/usuarios/dto/create-usuario.dto';
import { UsuariosService } from '@modules/usuarios/usuarios.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '@utils/bcrypt.utility';
import { LoginUsuarioDto } from './dto/login-usuario.dto';
import { RegisterUsuarioDto } from './dto/register-usuario.dto';
import { Token } from './interfaces/token.model';

@Injectable()
export class AuthService {
    constructor(
        private usuarioService: UsuariosService,
        private jwtService: JwtService,
    ) {}

    async registerUser(usuario: RegisterUsuarioDto): Promise<Token> {
        const usuarioToCreate: CreateUsuarioDto = {
            ...usuario,
            rolId: Roles.USER,
        };
        const usuarioCreated = await this.usuarioService.create(
            usuarioToCreate,
        );
        return this.createAccessToken(usuarioCreated);
    }

    private async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.usuarioService.findByEmail(email);
        if (!user) {
            throw new HttpException(
                {
                    status: HttpStatus.NOT_FOUND,
                    error: 'No se encontro una cuenta asociada a este correo electronico',
                },
                HttpStatus.NOT_FOUND,
            );
        }

        const passwordValid = await comparePassword(pass, user.contrasena);
        if (!passwordValid) {
            throw new HttpException(
                {
                    status: HttpStatus.UNAUTHORIZED,
                    error: 'La contrasenna es incorrecta',
                },
                HttpStatus.UNAUTHORIZED,
            );
        }
        return user;
    }

    async login(user: LoginUsuarioDto) {
        return this.createAccessToken(
            await this.validateUser(user.correoElectronico, user.contrasena),
        );
    }

    private createAccessToken(user: any): Token {
        const info = {
            id: user.id,
            nombre: [user.nombre1, user.nombre2, user.apellido1, user.apellido2]
                .filter((val) => val)
                .join(' '),
        };
        return {
            access_token: this.jwtService.sign(info),
            nombre: info.nombre,
            rol: user.rolId,
        };
    }
}
