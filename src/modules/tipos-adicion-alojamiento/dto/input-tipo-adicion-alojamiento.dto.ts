import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator';

export class InputTipoAdicionAlojamientoDto {
    @IsNotEmpty()
    @Length(1, 50)
    @ApiProperty()
    nombre: string;

    @IsNotEmpty()
    @Length(1, 200)
    @ApiProperty()
    descripcion: string;

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @ApiProperty()
    valor: number;
}
