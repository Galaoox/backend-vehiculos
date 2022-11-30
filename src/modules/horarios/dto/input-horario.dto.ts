import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class InputHorarioDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        nullable: false,
    })
    nombre: string;

    @MaxLength(200)
    @IsNotEmpty()
    @ApiProperty({
        maxLength: 200,
        nullable: false,
    })
    descripcion: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    horaInicial: string;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    horaFinal: string;
}
