import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class LoginUsuarioDto {
    @IsEmail()
    @ApiProperty()
    correoElectronico: string;

    @ApiProperty()
    contrasena: string;
}
