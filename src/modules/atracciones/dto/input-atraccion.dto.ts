import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class InputAtraccionDto {
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
}
