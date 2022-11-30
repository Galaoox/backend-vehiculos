import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength } from 'class-validator';

export class InputElementoMenuDto {
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
    @ApiProperty({
        nullable: false,
    })
    valor: number;

    @IsNotEmpty()
    @ApiProperty({
        nullable: false,
    })
    categoriaMenuId: number;
}
