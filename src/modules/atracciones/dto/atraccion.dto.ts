import { ApiProperty } from '@nestjs/swagger';

export class AtraccionDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    imagen: string;
}
