import { ApiProperty } from '@nestjs/swagger';
export class HorarioDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    horaInicial: string;
    @ApiProperty()
    horaFinal: string;
}
