import { InputCategoriaMenuDto } from '@modules/categorias-menu/dto/input-categoria-menu.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ElementoMenuDto {
    @ApiProperty()
    id: number;
    @ApiProperty()
    nombre: string;
    @ApiProperty()
    descripcion: string;
    @ApiProperty()
    valor: number;
    @ApiProperty()
    categoriaMenu: Partial<InputCategoriaMenuDto>;
}
