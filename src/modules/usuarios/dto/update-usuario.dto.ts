import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsEmail } from 'class-validator';
export class UpdateUsuarioDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        required: true,
    })
    nombre1: string;

    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        required: false,
    })
    nombre2: string;

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        required: true,
    })
    apellido1: string;

    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        required: true,
    })
    apellido2: string;

    @IsNotEmpty()
    @MaxLength(15)
    @ApiProperty({
        maxLength: 15,
        required: true,
    })
    documento: string;

    @IsNotEmpty()
    @MaxLength(100)
    @IsEmail()
    @ApiProperty({
        maxLength: 100,
        required: true,
    })
    correoElectronico: string;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    rolId: number;

    @IsNotEmpty()
    @ApiProperty({
        required: true,
    })
    tipoDocumentoId: number;
}
