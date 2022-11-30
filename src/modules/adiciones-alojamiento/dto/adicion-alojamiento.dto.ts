import { TipoAdicionAlojamientoDto } from '@modules/tipos-adicion-alojamiento/dto/tipo-adicion-alojamiento.dto';

export class AdicionAlojamientoDto {
    id: number;
    valor: number;
    // alojamiento: AlojamientoDto; TODO: CUANDO SE IMPLEMENTE EL CONTROLLER DE ALOJAMIENTO DESCOMENTAR ESTO
    tipoAdicionAlojamiento: TipoAdicionAlojamientoDto;
}
