import { ApiProperty } from '@nestjs/swagger';

export class InputAdicionAlojamientoDto {
    @ApiProperty()
    valor: number;
    @ApiProperty()
    tipoAdicionAlojamientoId: number;
    @ApiProperty()
    alojamientoId: number;
}
