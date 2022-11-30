import { ApiProperty } from '@nestjs/swagger';

export class RolDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
}
