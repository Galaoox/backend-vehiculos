import { ApiProperty } from '@nestjs/swagger';
export class TipoDocumentoDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
}
