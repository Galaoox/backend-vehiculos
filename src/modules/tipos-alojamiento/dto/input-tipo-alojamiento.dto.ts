import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator';

export class InputTipoAlojamientoDto {
    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({
        maxLength: 50,
        nullable: false,
    })
    nombre: string;

    @IsNotEmpty()
    @MaxLength(200)
    @ApiProperty({
        maxLength: 200,
        nullable: false,
    })
    descripcion: string;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        nullable: false,
    })
    capacidadPersonas: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        nullable: false,
    })
    cantidadDisponibles: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        nullable: false,
    })
    valor: number;
}
