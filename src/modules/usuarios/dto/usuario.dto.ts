import { RolDto } from '@modules/roles/dto/rol.dto';
import { TipoDocumentoDto } from '@modules/tipos-documentos/dto/tipo-documento.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
    @ApiProperty()
    nombre1: string;

    @ApiProperty()
    nombre2: string;

    @ApiProperty()
    apellido1: string;

    @ApiProperty()
    apellido2: string;

    @ApiProperty()
    documento: string;

    @ApiProperty()
    correoElectronico: string;

    @ApiProperty()
    contrasena: string;

    @ApiProperty()
    rol: RolDto;

    @ApiProperty()
    tipoDocumento: TipoDocumentoDto;
}
